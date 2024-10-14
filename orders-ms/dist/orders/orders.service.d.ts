import { Observable } from 'rxjs';
import { CreateOrderRequest, GetOrderRequest, OrderResponse, OrdersServiceClient } from 'src/types/orders';
import { ProductsService } from './products/products.service';
export declare class OrdersService implements OrdersServiceClient {
    private readonly products;
    private logger;
    private ordersDB;
    private itemsDB;
    constructor(products: ProductsService);
    createOrder(request: CreateOrderRequest): Observable<OrderResponse>;
    getOrder(request: GetOrderRequest): Observable<OrderResponse>;
}
