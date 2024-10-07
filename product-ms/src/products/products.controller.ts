import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  GetProductRequest,
  GetProductResponse,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceController,
} from 'src/types';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod(PRODUCTS_SERVICE_NAME, 'GetProduct')
  getProduct(
    request: GetProductRequest,
  ):
    | Promise<GetProductResponse>
    | Observable<GetProductResponse>
    | GetProductResponse {
    return this.productsService.getProduct(request.productId);
  }
}
