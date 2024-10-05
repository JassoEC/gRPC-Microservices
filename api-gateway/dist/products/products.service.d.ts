import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService implements OnModuleInit {
    private client;
    private service;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    create(createProductDto: CreateProductDto): string;
    findAll(): string;
    findOne(id: string): import("rxjs").Observable<import("src/types/products").GetProductResponse>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
