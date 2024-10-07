"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCTS_SERVICE_NAME = exports.PRODUCTS_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.ProductsServiceControllerMethods = ProductsServiceControllerMethods;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "products";
exports.PRODUCTS_PACKAGE_NAME = "products";
function ProductsServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["getProduct", "createProduct", "updateProduct", "deleteProduct"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("ProductsService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("ProductsService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.PRODUCTS_SERVICE_NAME = "ProductsService";
//# sourceMappingURL=products.js.map