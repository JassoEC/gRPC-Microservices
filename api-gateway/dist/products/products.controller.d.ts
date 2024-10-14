import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProduct(id: string): import("rxjs").Observable<import("../types/products").ProductResponse>;
    createProduct(dto: CreateProductDto): import("rxjs").Observable<import("../types/products").ProductResponse>;
    updateProduct(id: string, dto: CreateProductDto): import("rxjs").Observable<import("../types/products").ProductResponse>;
    deleteProduct(id: string): import("rxjs").Observable<import("../types/products").ProductResponse>;
}
