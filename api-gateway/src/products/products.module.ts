import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PRODUCTS_PACKAGE_NAME } from 'src/types/products';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
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
export class ProductsModule {}
