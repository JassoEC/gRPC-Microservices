import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Observable } from 'rxjs';
import { CreateOrderRequest, GetOrderRequest, OrderResponse, OrdersServiceClient } from 'src/types/orders';
export declare class OrdersService extends PrismaClient implements OnModuleInit, OrdersServiceClient {
    private logger;
    onModuleInit(): Promise<void>;
    createOrder(request: CreateOrderRequest): Observable<OrderResponse>;
    getOrder(request: GetOrderRequest): Observable<OrderResponse>;
}
