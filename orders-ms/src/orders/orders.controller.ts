import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { OrdersService } from './orders.service';
import {
  GetOrderRequest,
  GetOrderResponse,
  ORDERS_SERVICE_NAME,
  OrdersServiceController,
} from 'src/types/orders';

@Controller()
export class OrdersController implements OrdersServiceController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod(ORDERS_SERVICE_NAME, 'GetOrder')
  getOrder(
    request: GetOrderRequest,
  ):
    | Promise<GetOrderResponse>
    | Observable<GetOrderResponse>
    | GetOrderResponse {
    return this.ordersService.getOrder(request.orderId);
  }
}
