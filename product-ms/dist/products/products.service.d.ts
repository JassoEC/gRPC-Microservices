import { CreateProductRequest, FindProductRequest, ListProductsRequest, ListProductsResponse, Product, UpdateProductRequest } from 'src/types';
import { Product as ProductEntity } from './entities/Product';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    private logger;
    private productsDB;
    listProducts(request: ListProductsRequest): Promise<ListProductsResponse>;
    getProduct(request: FindProductRequest): Promise<Product>;
    createProduct(request: CreateProductRequest): Promise<Product>;
    updateProduct(request: UpdateProductRequest): Promise<Product>;
    deleteProduct(request: FindProductRequest): Promise<Product>;
    protected entityToProtoBuf(data: ProductEntity): Product;
}
