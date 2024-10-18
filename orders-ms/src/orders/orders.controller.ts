import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { OrdersService } from './orders.service';
import {
  CreateOrderRequest,
  GetOrderRequest,
  Order,
  ORDERS_SERVICE_NAME,
  OrdersServiceController,
} from 'src/types/orders';

@Controller()
export class OrdersController implements OrdersServiceController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod(ORDERS_SERVICE_NAME, 'CreateOrder')
  createOrder(request: CreateOrderRequest): Promise<Order> {
    return this.ordersService.createOrder(request);
  }

  @GrpcMethod(ORDERS_SERVICE_NAME, 'GetOrder')
  getOrder(request: GetOrderRequest): Promise<Order> {
    return this.ordersService.getOrder(request);
  }
}
