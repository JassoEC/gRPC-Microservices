import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreateProductRequest,
  FindProductRequest,
  ListProductsRequest,
  ListProductsResponse,
  Product,
  UpdateProductRequest,
} from 'src/types';
import { Product as ProductEntity } from './entities/Product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private logger = new Logger('ProductsService');

  async listProducts(
    request: ListProductsRequest,
  ): Promise<ListProductsResponse> {
    const { ids } = request;

    const data = await this.productRepository.find({
      where: {
        id: In(ids),
      },
    });

    return { products: data.map((product) => this.entityToProtoBuf(product)) };
  }

  async getProduct(request: FindProductRequest): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: request.productId },
    });

    if (!product) {
      throw new RpcException(
        `Could not find product with ID ${request.productId}`,
      );
    }

    return this.entityToProtoBuf(product);
  }

  async createProduct(request: CreateProductRequest): Promise<Product> {
    this.logger.log(`Creating product: ${JSON.stringify(request)}`);

    const product = new ProductEntity();

    product.name = request.name;
    product.description = request.description;
    product.price = request.price;
    product.availableQuantity = request.availableQuantity;

    const productCreated = await this.productRepository.save(product);

    return this.entityToProtoBuf(productCreated);
  }

  async updateProduct(request: UpdateProductRequest): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: request.productId },
    });

    if (!product) {
      throw new RpcException(
        `Could not find product with ID ${request.productId}`,
      );
    }

    product.name = request.name;
    product.description = request.description;
    product.price = request.price;
    product.availableQuantity = request.availableQuantity;

    const updated = await this.productRepository.save(product);

    return this.entityToProtoBuf(updated);
  }

  async deleteProduct(request: FindProductRequest): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: request.productId },
    });

    if (!product) {
      throw new RpcException(
        `Could not find product with ID ${request.productId}`,
      );
    }

    await this.productRepository.delete(product);

    return this.entityToProtoBuf(product);
  }

  protected entityToProtoBuf(data: ProductEntity): Product {
    return {
      productId: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      availableQuantity: data.availableQuantity,
    };
  }
}
