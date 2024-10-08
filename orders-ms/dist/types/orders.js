"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDERS_SERVICE_NAME = exports.ORDERS_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.OrdersServiceControllerMethods = OrdersServiceControllerMethods;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "orders";
exports.ORDERS_PACKAGE_NAME = "orders";
function OrdersServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["getOrder", "createOrder"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("OrdersService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("OrdersService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.ORDERS_SERVICE_NAME = "OrdersService";
//# sourceMappingURL=orders.js.map