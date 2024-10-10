import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaClient } from '@prisma/client';
import { CreateOrderRequest, GetOrderRequest, OrderResponse, OrdersServiceClient } from 'src/types/orders';
import { ProductsService } from './products/products.service';
export declare class OrdersService extends PrismaClient implements OnModuleInit, OrdersServiceClient {
    private readonly products;
    private logger;
    constructor(products: ProductsService);
    onModuleInit(): Promise<void>;
    createOrder(request: CreateOrderRequest): Observable<OrderResponse>;
    getOrder(request: GetOrderRequest): Observable<OrderResponse>;
}
