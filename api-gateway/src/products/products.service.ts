import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from 'src/types/products';

@Injectable()
export class ProductsService implements OnModuleInit {
  private service: ProductsServiceClient;

  constructor(@Inject(PRODUCTS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }

  findOne(id: string) {
    return this.service.getProduct({ productId: id });
  }
}
