import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { firstValueFrom, from, map, Observable } from 'rxjs';

import { PrismaClient } from '@prisma/client';

import {
  CreateOrderRequest,
  GetOrderRequest,
  OrderResponse,
  OrdersServiceClient,
} from 'src/types/orders';
import { ProductsService } from './products/products.service';
import { Product } from 'src/types/products';

@Injectable()
export class OrdersService
  extends PrismaClient
  implements OnModuleInit, OrdersServiceClient
{
  private logger = new Logger('OrdersService');

  constructor(private readonly products: ProductsService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  createOrder(request: CreateOrderRequest): Observable<OrderResponse> {
    const { items } = request;

    const products: Product[] = [];

    return new Observable((observer) => {
      items.forEach((item) => {
        const promise = this.products.getProduct(item.productId);
        const product$ = from(promise).pipe(
          map(({ product }): Product => product),
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
          error: (error) => observer.error(new RpcException(error)),
        });
      });

      this.order
        .create({
          data: {
            delivered: false,
            createdAt: new Date(request.createdAt).toString(),
            items: {
              create: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: { items: true },
        })
        .then((order) => {
          const response = {
            order: {
              orderId: order.id,
              createdAt: order.createdAt,
              delivered: order.delivered,
            },
            items: order.items.map((item) => ({
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
    });
  }

  getOrder(request: GetOrderRequest): Observable<OrderResponse> {
    return new Observable((observer) => {
      const orderPromise = this.order.findUnique({
        where: { id: request.orderId },
        include: { items: true },
      });

      orderPromise.then((order) =>
        firstValueFrom(
          this.products.getOrderProducts(
            order.items.map((item) => item.productId),
          ),
        )
          .then((products) => {
            observer.next({
              order: {
                orderId: order.id,
                createdAt: order.createdAt,
                delivered: order.delivered,
              },
              items: order.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                orderId: item.orderId,
                product: products.products.find(
                  (product) => product.productId === item.productId,
                ),
              })),
            });
            observer.complete();
          })
          .catch((error) => observer.error(new RpcException(error))),
      );
    });
  }
}
