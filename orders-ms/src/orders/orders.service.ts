import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, map, Observable } from 'rxjs';

import {
  CreateOrderRequest,
  GetOrderRequest,
  OrderResponse,
  OrdersServiceClient,
} from 'src/types/orders';

@Injectable()
export class OrdersService
  extends PrismaClient
  implements OnModuleInit, OrdersServiceClient
{
  private logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
  }

  createOrder(request: CreateOrderRequest): Observable<OrderResponse> {
    const newOrderPromise = this.order.create({
      data: {
        createdAt: request.createdAt,
        delivered: request.delivered,
        items: {
          create: request.items.map((item) => ({
            quantity: item.quantity,
            productId: item.productId,
          })),
        },
      },
    });

    return from(newOrderPromise).pipe(
      map((order) => ({
        order: {
          orderId: order.id,
          createdAt: order.createdAt,
          delivered: order.delivered,
        },
        items: [],
      })),
    );

    return undefined;
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
