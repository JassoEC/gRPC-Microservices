import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersServiceControllerMethods } from 'src/types/orders';
import { CreateOrderDto } from './dto/create-order.dto';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('orders')
@OrdersServiceControllerMethods()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseInterceptors(GrpcToHttpInterceptor)
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder({ orderId: id });
  }

  @Post()
  @UseInterceptors(GrpcToHttpInterceptor)
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder({
      delivered: dto.delivered,
      items: dto.items,
      createdAt: new Date().toString(),
    });
  }
}
