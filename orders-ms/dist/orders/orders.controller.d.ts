import { Observable } from 'rxjs';
import { OrdersService } from './orders.service';
import { GetOrderRequest, GetOrderResponse, OrdersServiceController } from 'src/types/orders';
export declare class OrdersController implements OrdersServiceController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrder(request: GetOrderRequest): Promise<GetOrderResponse> | Observable<GetOrderResponse> | GetOrderResponse;
}
