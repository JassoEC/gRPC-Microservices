import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateProductRequest,
  FindProductRequest,
  ListProductsRequest,
  ListProductsResponse,
  Product,
  ProductResponse,
  ProductsServiceClient,
  UpdateProductRequest,
} from 'src/types';

@Injectable()
export class ProductsService implements ProductsServiceClient {
  private logger = new Logger('ProductsService');

  // temporary in-memory database
  private productsDB: Product[] = [];

  listProducts(request: ListProductsRequest): Observable<ListProductsResponse> {
    const { ids } = request;

    const products = this.productsDB.filter((product) =>
      ids.includes(product.productId),
    );

    return new Observable((observer) => {
      observer.next({ products });
      observer.complete();
    });
  }

  getProduct(request: FindProductRequest): Observable<ProductResponse> {
    const product = this.productsDB.find(
      (product) => product.productId === request.productId,
    );

    if (!product) {
      throw new RpcException(
        `Could not find product with ID ${request.productId}`,
      );
    }

    return new Observable((observer) => {
      observer.next({ product });
      observer.complete();
    });
  }

  createProduct(request: CreateProductRequest): Observable<ProductResponse> {
    this.logger.log(`Creating product: ${JSON.stringify(request)}`);

    const product: Product = {
      productId: uuidv4(),
      name: request.name,
      description: request.description,
      price: request.price,
      availableQuantity: request.availableQuantity,
    };

    this.productsDB.push(product);

    return new Observable((observer) => {
      observer.next({ product });
      observer.complete();
    });
  }

  updateProduct(request: UpdateProductRequest): Observable<ProductResponse> {
    const product = this.productsDB.find(
      (product) => product.productId === request.productId,
    );

    if (!product) {
      throw new RpcException(
        `Could not find product with ID ${request.productId}`,
      );
    }

    return new Observable((observer) => {
      product.name = request.name;
      product.description = request.description;
      product.price = request.price;
      product.availableQuantity = request.availableQuantity;

      observer.next({ product });
      observer.complete();
    });
  }

  deleteProduct(request: FindProductRequest): Observable<ProductResponse> {
    const productIndex = this.productsDB.findIndex(
      (product) => product.productId === request.productId,
    );

    if (productIndex === -1) {
      throw new RpcException(
        `Could not find product with ID ${request.productId}`,
      );
    }

    const product = this.productsDB[productIndex];
    this.productsDB.splice(productIndex, 1);

    return new Observable((observer) => {
      observer.next({ product });
      observer.complete();
    });
  }
}
