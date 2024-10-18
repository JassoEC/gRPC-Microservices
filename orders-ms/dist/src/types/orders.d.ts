import { Observable } from "rxjs";
import { Product } from "./products";
export declare const protobufPackage = "orders";
export interface GetOrderRequest {
    orderId: string;
}
export interface Order {
    orderId: string;
    createdAt: string;
    items: OrderItem[];
}
export interface OrderItem {
    productId: string;
    quantity: number;
    orderId: string;
    product: Product | undefined;
}
export interface CreateOrderRequest {
    items: OrderItem[];
}
export declare const ORDERS_PACKAGE_NAME = "orders";
export interface OrdersServiceClient {
    getOrder(request: GetOrderRequest): Observable<Order>;
    createOrder(request: CreateOrderRequest): Observable<Order>;
}
export interface OrdersServiceController {
    getOrder(request: GetOrderRequest): Promise<Order> | Observable<Order> | Order;
    createOrder(request: CreateOrderRequest): Promise<Order> | Observable<Order> | Order;
}
export declare function OrdersServiceControllerMethods(): (constructor: Function) => void;
export declare const ORDERS_SERVICE_NAME = "OrdersService";
