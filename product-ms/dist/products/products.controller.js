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
const grpc_js_1 = require("@grpc/grpc-js");
const types_1 = require("../types");
let ProductsController = class ProductsController {
    getProduct(data, metadata, call) {
        const { productId } = data;
        const product = {
            productId: data.productId,
            name: 'Product 1',
            description: 'Description of product 1',
            price: 1000,
        };
        return { product };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, microservices_1.GrpcMethod)(types_1.PRODUCTS_SERVICE_NAME, 'GetProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, grpc_js_1.Metadata, Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "getProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)()
], ProductsController);
//# sourceMappingURL=products.controller.js.map