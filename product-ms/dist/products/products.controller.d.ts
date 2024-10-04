import { ProductsService } from './products.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProduct(data: GetProductRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): Product;
}
