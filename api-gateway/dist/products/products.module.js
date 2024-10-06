"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const products_1 = require("../types/products");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: products_1.PRODUCTS_PACKAGE_NAME,
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'products',
                        protoPath: (0, path_1.join)(__dirname, '../../../proto/products.proto'),
                    },
                },
            ]),
        ],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map