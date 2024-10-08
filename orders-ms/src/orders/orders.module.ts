import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PRODUCTS_PACKAGE_NAME } from 'src/types/products';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsService } from './products/products.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: 'products',
          protoPath: join(__dirname, '../../../proto/products.proto'),
        },
      },
    ]),
  ],
})
export class OrdersModule {}
