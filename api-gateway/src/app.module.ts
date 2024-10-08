import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ProductsModule, OrdersModule],
})
export class AppModule {}
