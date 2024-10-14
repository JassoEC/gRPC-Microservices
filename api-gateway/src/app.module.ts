import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
  imports: [ProductsModule, OrdersModule],
})
export class AppModule {}
