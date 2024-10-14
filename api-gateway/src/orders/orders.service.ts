import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  CreateOrderRequest,
  GetOrderRequest,
  OrderResponse,
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
  OrdersServiceClient,
} from 'src/types/orders';

@Injectable()
export class OrdersService implements OnModuleInit, OrdersServiceClient {
  private service: OrdersServiceClient;

  constructor(@Inject(ORDERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);
  }

  getOrder(request: GetOrderRequest): Observable<OrderResponse> {
    return this.service.getOrder(request);
  }

  createOrder(data: CreateOrderRequest) {
    return this.service.createOrder(data);
  }
}
