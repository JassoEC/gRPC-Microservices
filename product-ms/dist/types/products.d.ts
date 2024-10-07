import { Observable } from "rxjs";
export declare const protobufPackage = "products";
export interface FindProductRequest {
    productId: string;
}
export interface ProductResponse {
    product: Product | undefined;
}
export interface Product {
    productId: string;
    name: string;
    description: string;
    price: number;
}
export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
}
export interface UpdateProductRequest {
    productId: string;
    name: string;
    description: string;
    price: number;
}
export declare const PRODUCTS_PACKAGE_NAME = "products";
export interface ProductsServiceClient {
    getProduct(request: FindProductRequest): Observable<ProductResponse>;
    createProduct(request: CreateProductRequest): Observable<ProductResponse>;
    updateProduct(request: UpdateProductRequest): Observable<ProductResponse>;
    deleteProduct(request: FindProductRequest): Observable<ProductResponse>;
}
export interface ProductsServiceController {
    getProduct(request: FindProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    createProduct(request: CreateProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    updateProduct(request: UpdateProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    deleteProduct(request: FindProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
}
export declare function ProductsServiceControllerMethods(): (constructor: Function) => void;
export declare const PRODUCTS_SERVICE_NAME = "ProductsService";
