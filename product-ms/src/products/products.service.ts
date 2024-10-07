import { Injectable } from '@nestjs/common';
import { GetProductResponse } from 'src/types';

@Injectable()
export class ProductsService {
  getProduct(productId: string): GetProductResponse {
    return {
      product: {
        productId,
        name: 'Product 1',
        description: 'Description of product 1',
        price: 1000,
      },
    };
  }
}
