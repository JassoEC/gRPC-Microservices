import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductRequest, FindProductRequest, ListProductsRequest, ListProductsResponse, ProductResponse, ProductsServiceClient, UpdateProductRequest } from 'src/types/products';
export declare class ProductsService implements OnModuleInit, ProductsServiceClient {
    private client;
    private service;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    getProduct(request: FindProductRequest): Observable<ProductResponse>;
    createProduct(request: CreateProductRequest): Observable<ProductResponse>;
    updateProduct(request: UpdateProductRequest): Observable<ProductResponse>;
    deleteProduct(request: FindProductRequest): Observable<ProductResponse>;
    listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
}
