import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { catchError, from, map, Observable } from 'rxjs';

import {
  CreateProductRequest,
  FindProductRequest,
  ListProductsRequest,
  ListProductsResponse,
  ProductResponse,
  ProductsServiceClient,
  UpdateProductRequest,
} from 'src/types';

@Injectable()
export class ProductsService
  extends PrismaClient
  implements OnModuleInit, ProductsServiceClient
{
  private logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
  }

  listProducts(request: ListProductsRequest): Observable<ListProductsResponse> {
    const { ids } = request;
    const promise = this.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return from(promise).pipe(
      map((products) => ({
        products: products.map((product) => ({
          productId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          availableQuantity: product.available_quantity,
        })),
      })),
      catchError((error) => {
        this.logger.error(error);
        throw new RpcException(`Could not list products`);
      }),
    );
  }

  getProduct(request: FindProductRequest): Observable<ProductResponse> {
    const promise = this.product.findUnique({
      where: { id: request.productId },
    });

    return from(promise).pipe(
      map(
        (product): ProductResponse => ({
          product: {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            availableQuantity: product.available_quantity,
          },
        }),
      ),
      catchError((error) => {
        this.logger.error(error);
        throw new RpcException(
          `Could not find product with ID ${request.productId}`,
        );
      }),
    );
  }

  createProduct(request: CreateProductRequest): Observable<ProductResponse> {
    const promise = this.product.create({
      data: {
        name: request.name,
        description: request.description,
        price: request.price,
      },
    });

    return from(promise).pipe(
      map(
        (product): ProductResponse => ({
          product: {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            availableQuantity: product.available_quantity,
          },
        }),
      ),
      catchError((error) => {
        this.logger.error(error);
        throw new RpcException(`Could not create product`);
      }),
    );
  }

  updateProduct(request: UpdateProductRequest): Observable<ProductResponse> {
    const promise = this.product.update({
      where: { id: request.productId },
      data: {
        name: request.name,
        description: request.description,
        price: request.price,
      },
    });

    return from(promise).pipe(
      map(
        (product): ProductResponse => ({
          product: {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            availableQuantity: product.available_quantity,
          },
        }),
      ),
      catchError((error) => {
        this.logger.error(error);
        throw new RpcException(`Could not update product`);
      }),
    );
  }

  deleteProduct(request: FindProductRequest): Observable<ProductResponse> {
    const promise = this.product.delete({
      where: { id: request.productId },
    });

    return from(promise).pipe(
      map(
        (product): ProductResponse => ({
          product: {
            productId: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            availableQuantity: product.available_quantity,
          },
        }),
      ),
      catchError((error) => {
        this.logger.error(error);
        throw new RpcException(`Could not delete product`);
      }),
    );
  }
}
