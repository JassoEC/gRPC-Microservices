import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
export declare class ProductsService implements OnModuleInit {
    private readonly client;
    private service;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    getProduct(productId: string): import("rxjs").Observable<import("src/types/products").Product>;
    getOrderProducts(ids: string[]): import("rxjs").Observable<import("src/types/products").ListProductsResponse>;
}
