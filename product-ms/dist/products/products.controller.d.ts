import { Observable } from 'rxjs';
import { CreateProductRequest, FindProductRequest, ListProductsRequest, ListProductsResponse, ProductResponse, ProductsServiceController, UpdateProductRequest } from 'src/types';
import { ProductsService } from './products.service';
export declare class ProductsController implements ProductsServiceController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    listProducts(request: ListProductsRequest): Promise<ListProductsResponse> | Observable<ListProductsResponse> | ListProductsResponse;
    getProduct(request: FindProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    createProduct(request: CreateProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    updateProduct(request: UpdateProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
    deleteProduct(request: FindProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
}
