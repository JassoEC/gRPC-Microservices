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
    availableQuantity: number;
}
export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
}
export interface UpdateProductRequest {
    productId: string;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
}
export interface ListProductsRequest {
    ids: string[];
}
export interface ListProductsResponse {
    products: Product[];
}
export declare const PRODUCTS_PACKAGE_NAME = "products";
export interface ProductsServiceClient {
    getProduct(request: FindProductRequest): Observable<ProductResponse>;
    createProduct(request: CreateProductRequest): Observable<ProductResponse>;
    updateProduct(request: UpdateProductRequest): Observable<ProductResponse>;
    deleteProduct(request: FindProductRequest): Observable<ProductResponse>;
    listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
}
export interface ProductsServiceController {
    getProduct(request: FindProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    createProduct(request: CreateProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    updateProduct(request: UpdateProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    deleteProduct(request: FindProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    listProducts(request: ListProductsRequest): Promise<ListProductsResponse> | Observable<ListProductsResponse> | ListProductsResponse;
}
export declare function ProductsServiceControllerMethods(): (constructor: Function) => void;
export declare const PRODUCTS_SERVICE_NAME = "ProductsService";
