import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PRODUCTS_PACKAGE_NAME } from 'src/types/products';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsService } from './products/products.service';
import { Order } from './entities/Order.entity';
import { OrderItem } from './entities/OrderItem.entity';
import { envs } from 'config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: envs.PRODUCTS_SERVICE_URL,
          package: 'products',
          protoPath: join(__dirname, '../../../../proto/products.proto'),
        },
      },
    ]),
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
})
export class OrdersModule {}
