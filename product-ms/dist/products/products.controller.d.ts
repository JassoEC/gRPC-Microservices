import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { GetProductRequest, GetProductResponse } from 'src/types';
export declare class ProductsController {
    getProduct(data: GetProductRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): GetProductResponse;
}
