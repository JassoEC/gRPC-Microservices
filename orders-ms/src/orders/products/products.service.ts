import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PRODUCTS_PACKAGE_NAME,
  ProductsServiceClient,
} from 'src/types/products';

@Injectable()
export class ProductsService implements OnModuleInit {
  private service: ProductsServiceClient;

  constructor(
    @Inject(PRODUCTS_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<ProductsServiceClient>('ProductsService');
  }

  getProduct(productId: string) {
    return this.service.getProduct({ productId });
  }

  getOrderProducts(ids: string[]) {
    return this.service.listProducts({ ids });
  }
}
