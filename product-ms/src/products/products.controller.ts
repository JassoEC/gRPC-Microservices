import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod()
  getProduct(
    data: GetProductRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Product {
    return {
      id: 1,
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100,
    };
  }
}
