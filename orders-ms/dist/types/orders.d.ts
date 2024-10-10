import { Observable } from "rxjs";
import { Product } from "./products";
export declare const protobufPackage = "orders";
export interface GetOrderRequest {
    orderId: string;
}
export interface OrderResponse {
    order: Order | undefined;
    items: OrderItem[];
}
export interface Order {
    orderId: string;
    createdAt: string;
    delivered: boolean;
}
export interface OrderItem {
    productId: string;
    quantity: number;
    orderId: string;
    product: Product | undefined;
}
export interface CreateOrderRequest {
    createdAt: string;
    delivered: boolean;
    items: OrderItem[];
}
export declare const ORDERS_PACKAGE_NAME = "orders";
export interface OrdersServiceClient {
    getOrder(request: GetOrderRequest): Observable<OrderResponse>;
    createOrder(request: CreateOrderRequest): Observable<OrderResponse>;
}
export interface OrdersServiceController {
    getOrder(request: GetOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;
    createOrder(request: CreateOrderRequest): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;
}
export declare function OrdersServiceControllerMethods(): (constructor: Function) => void;
export declare const ORDERS_SERVICE_NAME = "OrdersService";
