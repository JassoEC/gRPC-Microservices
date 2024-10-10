"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const client_1 = require("@prisma/client");
const rxjs_1 = require("rxjs");
let ProductsService = class ProductsService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ProductsService');
    }
    async onModuleInit() {
        await this.$connect();
    }
    getProduct(request) {
        const promise = this.product.findUnique({
            where: { id: request.productId },
        });
        return (0, rxjs_1.from)(promise).pipe((0, rxjs_1.map)((product) => ({
            product: {
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                availableQuantity: product.available_quantity,
            },
        })), (0, rxjs_1.catchError)((error) => {
            this.logger.error(error);
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }));
    }
    createProduct(request) {
        const promise = this.product.create({
            data: {
                name: request.name,
                description: request.description,
                price: request.price,
            },
        });
        return (0, rxjs_1.from)(promise).pipe((0, rxjs_1.map)((product) => ({
            product: {
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                availableQuantity: product.available_quantity,
            },
        })), (0, rxjs_1.catchError)((error) => {
            this.logger.error(error);
            throw new microservices_1.RpcException(`Could not create product`);
        }));
    }
    updateProduct(request) {
        const promise = this.product.update({
            where: { id: request.productId },
            data: {
                name: request.name,
                description: request.description,
                price: request.price,
            },
        });
        return (0, rxjs_1.from)(promise).pipe((0, rxjs_1.map)((product) => ({
            product: {
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                availableQuantity: product.available_quantity,
            },
        })), (0, rxjs_1.catchError)((error) => {
            this.logger.error(error);
            throw new microservices_1.RpcException(`Could not update product`);
        }));
    }
    deleteProduct(request) {
        const promise = this.product.delete({
            where: { id: request.productId },
        });
        return (0, rxjs_1.from)(promise).pipe((0, rxjs_1.map)((product) => ({
            product: {
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                availableQuantity: product.available_quantity,
            },
        })), (0, rxjs_1.catchError)((error) => {
            this.logger.error(error);
            throw new microservices_1.RpcException(`Could not delete product`);
        }));
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map