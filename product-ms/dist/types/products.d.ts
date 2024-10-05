import { Observable } from "rxjs";
export declare const protobufPackage = "products";
export interface GetProductRequest {
    productId: string;
}
export interface GetProductResponse {
    product: Product | undefined;
}
export interface Product {
    productId: string;
    name: string;
    description: string;
    price: number;
}
export declare const PRODUCTS_PACKAGE_NAME = "products";
export interface ProductsServiceClient {
    getProduct(request: GetProductRequest): Observable<GetProductResponse>;
}
export interface ProductsServiceController {
    getProduct(request: GetProductRequest): Promise<GetProductResponse> | Observable<GetProductResponse> | GetProductResponse;
}
export declare function ProductsServiceControllerMethods(): (constructor: Function) => void;
export declare const PRODUCTS_SERVICE_NAME = "ProductsService";
