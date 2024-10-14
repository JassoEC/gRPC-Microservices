import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  CreateProductRequest,
  FindProductRequest,
  ListProductsRequest,
  ListProductsResponse,
  ProductResponse,
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
  UpdateProductRequest,
} from 'src/types/products';

@Injectable()
export class ProductsService implements OnModuleInit, ProductsServiceClient {
  private service: ProductsServiceClient;

  constructor(@Inject(PRODUCTS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }

  getProduct(request: FindProductRequest): Observable<ProductResponse> {
    return this.service.getProduct(request);
  }
  createProduct(request: CreateProductRequest): Observable<ProductResponse> {
    return this.service.createProduct(request);
  }
  updateProduct(request: UpdateProductRequest): Observable<ProductResponse> {
    return this.service.updateProduct(request);
  }
  deleteProduct(request: FindProductRequest): Observable<ProductResponse> {
    return this.service.deleteProduct(request);
  }
  listProducts(request: ListProductsRequest): Observable<ListProductsResponse> {
    return this.service.listProducts(request);
  }
}
