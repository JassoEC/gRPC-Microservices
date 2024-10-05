import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_PACKAGE',
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
