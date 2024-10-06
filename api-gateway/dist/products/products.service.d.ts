import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
export declare class ProductsService implements OnModuleInit {
    private client;
    private service;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    findOne(id: string): import("rxjs").Observable<import("src/types/products").GetProductResponse>;
}
