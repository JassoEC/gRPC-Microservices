import { CreateProductRequest, FindProductRequest, ListProductsRequest, ListProductsResponse, Product, ProductsServiceController, UpdateProductRequest } from 'src/types';
import { ProductsService } from './products.service';
export declare class ProductsController implements ProductsServiceController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    listProducts(request: ListProductsRequest): Promise<ListProductsResponse>;
    getProduct(request: FindProductRequest): Promise<Product>;
    createProduct(request: CreateProductRequest): Promise<Product>;
    updateProduct(request: UpdateProductRequest): Promise<Product>;
    deleteProduct(request: FindProductRequest): Promise<Product>;
}
