import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { GetOrderRequest } from 'src/types/orders';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrdersService', 'GetOrder')
  getOrder(@Payload() data: GetOrderRequest) {
    return this.ordersService.getOrder(data.orderId);
  }
}
