import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderRequest, GetOrderRequest, Order } from 'src/types/orders';
import {
  Product,
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from 'src/types/products';
import { Order as OrderEntity } from './entities/Order.entity';
import { OrderItem as OrderItemEntity } from './entities/OrderItem.entity';

@Injectable()
export class OrdersService implements OnModuleInit {
  private productsService: ProductsServiceClient;

  constructor(
    @Inject(PRODUCTS_PACKAGE_NAME) private readonly client: ClientGrpc,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly itemsRepository: Repository<OrderItemEntity>,
  ) {}

  onModuleInit() {
    this.productsService = this.client.getService<ProductsServiceClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }

  private logger: Logger = new Logger(OrdersService.name);

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    try {
      const { items } = request;

      const { products } = await firstValueFrom(
        this.productsService
          .listProducts({
            ids: items.map((item) => item.productId),
          })
          .pipe(
            catchError((error) => {
              this.logger.error(`Error fetching products: ${error}`);
              throw new RpcException(`Error fetching products: ${error}`);
            }),
          ),
      );

      const newOrder = await this.ordersRepository.save(new OrderEntity());

      await Promise.all(
        items.map((item) => {
          return this.itemsRepository.save({
            order: newOrder,
            productId: item.productId,
            quantity: item.quantity,
          });
        }),
      );

      const order = await this.ordersRepository.findOne({
        where: { id: newOrder.id },
        relations: ['items'],
      });

      return this.entityToProtoBuf(order, products);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOrder(request: GetOrderRequest): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: request.orderId },
      relations: ['items'],
    });

    if (!order) {
      this.logger.error(`Order with id ${request.orderId} not found`);
      throw new RpcException(`Order with id ${request.orderId} not found`);
    }

    const products$ = this.productsService.listProducts({
      ids: order.items.map((item) => item.productId),
    });

    if (!products$) {
      this.logger.error(`Error fetching products`);
      throw new RpcException(`Error fetching products`);
    }

    const products = await firstValueFrom(products$);

    return this.entityToProtoBuf(order, products.products);
  }

  private entityToProtoBuf(order: OrderEntity, products: Product[]): Order {
    return {
      orderId: order.id,
      createdAt: order.createdAt.toString(),
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        orderId: item.orderId,
        product: products.find(
          (product) => product.productId === item.productId,
        ),
      })),
    };
  }
}
