import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Observable } from 'rxjs';
import { CreateProductRequest, FindProductRequest, ProductResponse, ProductsServiceClient, UpdateProductRequest } from 'src/types';
export declare class ProductsService extends PrismaClient implements OnModuleInit, ProductsServiceClient {
    private logger;
    onModuleInit(): Promise<void>;
    getProduct(request: FindProductRequest): Observable<ProductResponse>;
    createProduct(request: CreateProductRequest): Observable<ProductResponse>;
    updateProduct(request: UpdateProductRequest): Observable<ProductResponse>;
    deleteProduct(request: FindProductRequest): Observable<ProductResponse>;
}
