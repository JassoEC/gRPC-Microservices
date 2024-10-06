import { Observable } from "rxjs";
export declare const protobufPackage = "orders";
export interface GetOrderRequest {
    orderId: string;
}
export interface GetOrderResponse {
    orderId: string;
    items: OrderItem[];
}
export interface OrderItem {
    productId: string;
    quantity: number;
}
export declare const ORDERS_PACKAGE_NAME = "orders";
export interface OrdersServiceClient {
    getOrder(request: GetOrderRequest): Observable<GetOrderResponse>;
}
export interface OrdersServiceController {
    getOrder(request: GetOrderRequest): Promise<GetOrderResponse> | Observable<GetOrderResponse> | GetOrderResponse;
}
export declare function OrdersServiceControllerMethods(): (constructor: Function) => void;
export declare const ORDERS_SERVICE_NAME = "OrdersService";
