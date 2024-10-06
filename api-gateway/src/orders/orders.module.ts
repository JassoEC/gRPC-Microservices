import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ORDERS_PACKAGE_NAME } from 'src/types/orders';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5001',
          package: 'orders',
          protoPath: join(__dirname, '../../../proto/orders.proto'),
        },
      },
    ]),
  ],
})
export class OrdersModule {}
