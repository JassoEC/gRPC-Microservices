import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
  OrdersServiceClient,
} from 'src/types/orders';

@Injectable()
export class OrdersService implements OnModuleInit {
  private service: OrdersServiceClient;

  constructor(@Inject(ORDERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<OrdersServiceClient>(ORDERS_SERVICE_NAME);
  }

  findOne(id: string) {
    return this.service.getOrder({ orderId: id });
  }
}
