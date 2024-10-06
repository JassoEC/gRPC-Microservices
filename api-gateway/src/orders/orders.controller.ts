import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersServiceControllerMethods } from 'src/types/orders';

@Controller('orders')
// @OrdersServiceControllerMethods()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
