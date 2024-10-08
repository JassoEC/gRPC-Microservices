import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { catchError, from, map, Observable } from 'rxjs';

import {
  CreateOrderRequest,
  GetOrderRequest,
  OrderResponse,
  OrdersServiceClient,
} from 'src/types/orders';
import { ProductsService } from './products/products.service';
import { RpcException } from '@nestjs/microservices';

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

    return new Observable((observer) => {
      items.forEach((item) => {
        const product = this.products.getProduct(item.productId);

        product.subscribe({
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
            })),
          };
          observer.next(response);
          observer.complete();
        });
    });
  }

  getOrder(request: GetOrderRequest): Observable<OrderResponse> {
    const orderPromise = this.order.findUnique({
      where: { id: request.orderId },
      include: { items: true },
    });

    return from(orderPromise).pipe(
      map((order) => ({
        order: {
          orderId: order.id,
          createdAt: order.createdAt,
          delivered: order.delivered,
        },
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          orderId: item.orderId,
        })),
      })),
    );
  }
}
