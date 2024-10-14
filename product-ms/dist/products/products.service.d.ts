import { Observable } from 'rxjs';
import { CreateProductRequest, FindProductRequest, ListProductsRequest, ListProductsResponse, ProductResponse, ProductsServiceClient, UpdateProductRequest } from 'src/types';
export declare class ProductsService implements ProductsServiceClient {
    private logger;
    private productsDB;
    listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;
    getProduct(request: FindProductRequest): Observable<ProductResponse>;
    createProduct(request: CreateProductRequest): Observable<ProductResponse>;
    updateProduct(request: UpdateProductRequest): Observable<ProductResponse>;
    deleteProduct(request: FindProductRequest): Observable<ProductResponse>;
}
