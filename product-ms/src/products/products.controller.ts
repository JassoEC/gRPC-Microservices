import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  CreateProductRequest,
  FindProductRequest,
  ProductResponse,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceController,
  UpdateProductRequest,
} from 'src/types';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productsService: ProductsService) {}
  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'GetProduct')
  getProduct(
    request: FindProductRequest,
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productsService.getProduct(request);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'CreateProduct')
  createProduct(
    request: CreateProductRequest,
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productsService.createProduct(request);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'UpdateProduct')
  updateProduct(
    request: UpdateProductRequest,
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productsService.updateProduct(request);
  }

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'DeleteProduct')
  deleteProduct(
    request: FindProductRequest,
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productsService.deleteProduct(request);
  }
}
