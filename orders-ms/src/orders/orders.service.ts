import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError, from, map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateOrderRequest,
  GetOrderRequest,
  Order,
  OrderItem,
  OrderResponse,
  OrdersServiceClient,
} from 'src/types/orders';
import { ProductsService } from './products/products.service';
import { Product } from 'src/types/products';

@Injectable()
export class OrdersService implements OrdersServiceClient {
  private logger: Logger = new Logger(OrdersService.name);

  private ordersDB: Order[] = [];
  private itemsDB: OrderItem[] = [];

  constructor(private readonly products: ProductsService) {}

  createOrder(request: CreateOrderRequest): Observable<OrderResponse> {
    const { items } = request;

    const products: Product[] = [];

    return new Observable((observer) => {
      items.forEach((item) => {
        const promise = this.products.getProduct(item.productId);
        const product$ = from(promise).pipe(
          map(({ product }): Product => product),
          catchError((error) => {
            this.logger.error(`Error fetching product: ${error}`);
            throw new RpcException(error);
          }),
        );

        product$.subscribe({
          next: (product) => {
            if (product.availableQuantity < item.quantity) {
              observer.error(
                new RpcException(
                  `Not enough stock for product ${item.productId}`,
                ),
              );
            }
            products.push(product);
          },
          error: (error) => {
            this.logger.error(`Error fetching product: ${error}`);
            observer.error(new RpcException(error));
          },
        });
      });

      const order = {
        orderId: uuidv4(),
        createdAt: new Date(request.createdAt).toString(),
        delivered: false,
      };

      items.forEach((item) => {
        this.itemsDB.push({
          orderId: order.orderId,
          productId: item.productId,
          quantity: item.quantity,
          product: products.find(
            (product) => product.productId === item.productId,
          ),
        });
      });

      this.ordersDB.push(order);

      const response: OrderResponse = {
        order,
        items: this.itemsDB
          .filter((item) => item.orderId === order.orderId)
          .map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            orderId: item.orderId,
            product: products.find(
              (product) => product.productId === item.productId,
            ),
          })),
      };

      observer.next(response);
      observer.complete();
    });
  }

  getOrder(request: GetOrderRequest): Observable<OrderResponse> {
    const order = this.ordersDB.find(
      (order) => order.orderId === request.orderId,
    );

    if (!order) {
      this.logger.error(`Order with id ${request.orderId} not found`);
      throw new RpcException(`Order with id ${request.orderId} not found`);
    }

    return new Observable((observer) => {
      const items = this.itemsDB.filter(
        (item) => item.orderId === request.orderId,
      );

      const products$ = this.products.getOrderProducts(
        items.map((item) => item.productId),
      );

      products$.subscribe((prodObserver) => {
        const response: OrderResponse = {
          order,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            orderId: item.orderId,
            product: prodObserver.products.find(
              (product) => product.productId === item.productId,
            ),
          })),
        };

        observer.next(response);
        observer.complete();
      });
    });
  }
}
