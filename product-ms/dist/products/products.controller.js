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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const types_1 = require("../types");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getProduct(request) {
        return this.productsService.getProduct(request);
    }
    createProduct(request) {
        return this.productsService.createProduct(request);
    }
    updateProduct(request) {
        return this.productsService.updateProduct(request);
    }
    deleteProduct(request) {
        return this.productsService.deleteProduct(request);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, microservices_1.GrpcMethod)(types_1.PRODUCTS_SERVICE_NAME, 'GetProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, microservices_1.GrpcMethod)(types_1.PRODUCTS_SERVICE_NAME, 'CreateProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, microservices_1.GrpcMethod)(types_1.PRODUCTS_SERVICE_NAME, 'UpdateProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, microservices_1.GrpcMethod)(types_1.PRODUCTS_SERVICE_NAME, 'DeleteProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map