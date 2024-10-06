import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import {
  GetProductRequest,
  GetProductResponse,
  Product,
  PRODUCTS_SERVICE_NAME,
} from 'src/types';

@Controller()
export class ProductsController {
  // constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'GetProduct')
  getProduct(
    data: GetProductRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): GetProductResponse {
    const { productId } = data;

    const product: Product = {
      productId: data.productId,
      name: 'Product 1',
      description: 'Description of product 1',
      price: 1000,
    };

    return { product };
  }
}
