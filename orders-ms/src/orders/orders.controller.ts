import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { OrdersService } from './orders.service';
import {
  CreateOrderRequest,
  GetOrderRequest,
  ListOrdersResponse,
  Order,
  ORDERS_SERVICE_NAME,
  OrdersServiceController,
} from 'src/types/orders';
import { Observable } from 'rxjs';
import { Empty } from 'src/types/google/protobuf/empty';

@Controller()
export class OrdersController implements OrdersServiceController {
  constructor(private readonly ordersService: OrdersService) {}
  listOrders(
    request: Empty,
  ):
    | Promise<ListOrdersResponse>
    | Observable<ListOrdersResponse>
    | ListOrdersResponse {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(ORDERS_SERVICE_NAME, 'CreateOrder')
  createOrder(request: CreateOrderRequest): Promise<Order> {
    return this.ordersService.createOrder(request);
  }

  @GrpcMethod(ORDERS_SERVICE_NAME, 'GetOrder')
  getOrder(request: GetOrderRequest): Promise<Order> {
    return this.ordersService.getOrder(request);
  }
}
