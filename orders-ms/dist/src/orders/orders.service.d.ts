import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateOrderRequest, GetOrderRequest, Order } from 'src/types/orders';
import { Order as OrderEntity } from './entities/Order.entity';
import { OrderItem as OrderItemEntity } from './entities/OrderItem.entity';
export declare class OrdersService implements OnModuleInit {
    private readonly client;
    private readonly ordersRepository;
    private readonly itemsRepository;
    private productsService;
    constructor(client: ClientGrpc, ordersRepository: Repository<OrderEntity>, itemsRepository: Repository<OrderItemEntity>);
    onModuleInit(): void;
    private logger;
    createOrder(request: CreateOrderRequest): Promise<Order>;
    getOrder(request: GetOrderRequest): Promise<Order>;
    private entityToProtoBuf;
}
