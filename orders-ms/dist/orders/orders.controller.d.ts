import { OrdersService } from './orders.service';
import { GetOrderRequest } from 'src/types/orders';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrder(data: GetOrderRequest): import("src/types/orders").GetOrderResponse;
}
