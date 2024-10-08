import { Observable } from 'rxjs';
import { OrdersService } from './orders.service';
import { CreateOrderRequest, GetOrderRequest, OrderResponse, OrdersServiceController } from 'src/types/orders';
export declare class OrdersController implements OrdersServiceController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(request: CreateOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;
    getOrder(request: GetOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;
}
