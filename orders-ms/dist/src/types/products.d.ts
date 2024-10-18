import { Observable } from "rxjs";
export declare const protobufPackage = "products";
export interface FindProductRequest {
    productId: string;
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
    getProduct(request: FindProductRequest): Observable<Product>;
    createProduct(request: CreateProductRequest): Observable<Product>;
    updateProduct(request: UpdateProductRequest): Observable<Product>;
    deleteProduct(request: FindProductRequest): Observable<Product>;
    listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
}
export interface ProductsServiceController {
    getProduct(request: FindProductRequest): Promise<Product> | Observable<Product> | Product;
    createProduct(request: CreateProductRequest): Promise<Product> | Observable<Product> | Product;
    updateProduct(request: UpdateProductRequest): Promise<Product> | Observable<Product> | Product;
    deleteProduct(request: FindProductRequest): Promise<Product> | Observable<Product> | Product;
    listProducts(request: ListProductsRequest): Promise<ListProductsResponse> | Observable<ListProductsResponse> | ListProductsResponse;
}
export declare function ProductsServiceControllerMethods(): (constructor: Function) => void;
export declare const PRODUCTS_SERVICE_NAME = "ProductsService";
