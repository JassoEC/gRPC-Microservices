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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const products_service_1 = require("./products/products.service");
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(products) {
        this.products = products;
        this.logger = new common_1.Logger(OrdersService_1.name);
        this.ordersDB = [];
        this.itemsDB = [];
    }
    createOrder(request) {
        const { items } = request;
        const products = [];
        return new rxjs_1.Observable((observer) => {
            items.forEach((item) => {
                const promise = this.products.getProduct(item.productId);
                const product$ = (0, rxjs_1.from)(promise).pipe((0, rxjs_1.map)(({ product }) => product));
                product$.subscribe({
                    next: (product) => {
                        if (product.availableQuantity < item.quantity) {
                            observer.error(new microservices_1.RpcException(`Not enough stock for product ${item.productId}`));
                        }
                        products.push(product);
                    },
                    error: (error) => {
                        this.logger.error(`Error fetching product: ${error}`);
                        observer.error(new microservices_1.RpcException(error));
                    },
                });
            });
            const order = {
                orderId: (0, uuid_1.v4)(),
                createdAt: new Date(request.createdAt).toString(),
                delivered: false,
            };
            items.forEach((item) => {
                this.itemsDB.push({
                    orderId: order.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    product: products.find((product) => product.productId === item.productId),
                });
            });
            this.ordersDB.push(order);
            const response = {
                order,
                items: this.itemsDB
                    .filter((item) => item.orderId === order.orderId)
                    .map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    orderId: item.orderId,
                    product: products.find((product) => product.productId === item.productId),
                })),
            };
            observer.next(response);
            observer.complete();
        });
    }
    getOrder(request) {
        const order = this.ordersDB.find((order) => order.orderId === request.orderId);
        if (!order) {
            this.logger.error(`Order with id ${request.orderId} not found`);
            throw new microservices_1.RpcException(`Order with id ${request.orderId} not found`);
        }
        return new rxjs_1.Observable((observer) => {
            const items = this.itemsDB.filter((item) => item.orderId === request.orderId);
            const products$ = this.products.getOrderProducts(items.map((item) => item.productId));
            products$.subscribe((prodObserver) => {
                const response = {
                    order,
                    items: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        orderId: item.orderId,
                        product: prodObserver.products.find((product) => product.productId === item.productId),
                    })),
                };
                observer.next(response);
                observer.complete();
            });
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map