import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersModule } from './orders/orders.module';
import { envs } from 'config';
import { Order } from './orders/entities/Order.entity';
import { OrderItem } from './orders/entities/OrderItem.entity';

@Module({
  imports: [
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      password: envs.DB_PASSWORD,
      username: envs.DB_USER,
      database: envs.DB_NAME,
      entities: [Order, OrderItem],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
