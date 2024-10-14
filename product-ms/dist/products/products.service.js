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
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
let ProductsService = class ProductsService {
    constructor() {
        this.logger = new common_1.Logger('ProductsService');
        this.productsDB = [];
    }
    listProducts(request) {
        const { ids } = request;
        const products = this.productsDB.filter((product) => ids.includes(product.productId));
        return new rxjs_1.Observable((observer) => {
            observer.next({ products });
            observer.complete();
        });
    }
    getProduct(request) {
        const product = this.productsDB.find((product) => product.productId === request.productId);
        if (!product) {
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }
        return new rxjs_1.Observable((observer) => {
            observer.next({ product });
            observer.complete();
        });
    }
    createProduct(request) {
        this.logger.log(`Creating product: ${JSON.stringify(request)}`);
        const product = {
            productId: (0, uuid_1.v4)(),
            name: request.name,
            description: request.description,
            price: request.price,
            availableQuantity: request.availableQuantity,
        };
        this.productsDB.push(product);
        return new rxjs_1.Observable((observer) => {
            observer.next({ product });
            observer.complete();
        });
    }
    updateProduct(request) {
        const product = this.productsDB.find((product) => product.productId === request.productId);
        if (!product) {
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }
        return new rxjs_1.Observable((observer) => {
            product.name = request.name;
            product.description = request.description;
            product.price = request.price;
            product.availableQuantity = request.availableQuantity;
            observer.next({ product });
            observer.complete();
        });
    }
    deleteProduct(request) {
        const productIndex = this.productsDB.findIndex((product) => product.productId === request.productId);
        if (productIndex === -1) {
            throw new microservices_1.RpcException(`Could not find product with ID ${request.productId}`);
        }
        const product = this.productsDB[productIndex];
        this.productsDB.splice(productIndex, 1);
        return new rxjs_1.Observable((observer) => {
            observer.next({ product });
            observer.complete();
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map