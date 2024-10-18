import { OrdersService } from './orders.service';
import { CreateOrderRequest, GetOrderRequest, Order, OrdersServiceController } from 'src/types/orders';
export declare class OrdersController implements OrdersServiceController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(request: CreateOrderRequest): Promise<Order>;
    getOrder(request: GetOrderRequest): Promise<Order>;
}
