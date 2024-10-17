"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const Product_1 = require("./entities/Product");
const typeorm_2 = require("typeorm");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger('ProductsService');
        this.productsDB = [];
    }
    async listProducts(request) {
        const { ids } = request;
        const products = this.productsDB.filter((product) => ids.includes(product.productId));
        return { products };
    }
    async getProduct(request) {
        const product = await this.productRepository.findOne({
            where: { id: request.productId },
        });
        if (!product) {
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }
        return this.entityToProtoBuf(product);
    }
    async createProduct(request) {
        this.logger.log(`Creating product: ${JSON.stringify(request)}`);
        const product = new Product_1.Product();
        product.name = request.name;
        product.description = request.description;
        product.price = request.price;
        product.availableQuantity = request.availableQuantity;
        const productCreated = await this.productRepository.save(product);
        return this.entityToProtoBuf(productCreated);
    }
    async updateProduct(request) {
        const product = await this.productRepository.findOne({
            where: { id: request.productId },
        });
        if (!product) {
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }
        product.name = request.name;
        product.description = request.description;
        product.price = request.price;
        product.availableQuantity = request.availableQuantity;
        const updated = await this.productRepository.save(product);
        return this.entityToProtoBuf(updated);
    }
    async deleteProduct(request) {
        const product = await this.productRepository.findOne({
            where: { id: request.productId },
        });
        if (!product) {
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }
        await this.productRepository.delete(product);
        return this.entityToProtoBuf(product);
    }
    entityToProtoBuf(data) {
        return {
            productId: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            availableQuantity: data.availableQuantity,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map