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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const rxjs_1 = require("rxjs");
const products_service_1 = require("./products/products.service");
const microservices_1 = require("@nestjs/microservices");
let OrdersService = class OrdersService extends client_1.PrismaClient {
    constructor(products) {
        super();
        this.products = products;
        this.logger = new common_1.Logger('OrdersService');
    }
    async onModuleInit() {
        await this.$connect();
    }
    createOrder(request) {
        const { items } = request;
        return new rxjs_1.Observable((observer) => {
            items.forEach((item) => {
                const product = this.products.getProduct(item.productId);
                product.subscribe({
                    error: (error) => observer.error(new microservices_1.RpcException(error)),
                });
            });
            this.order
                .create({
                data: {
                    delivered: false,
                    createdAt: new Date(request.createdAt).toString(),
                    items: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: { items: true },
            })
                .then((order) => {
                const response = {
                    order: {
                        orderId: order.id,
                        createdAt: order.createdAt,
                        delivered: order.delivered,
                    },
                    items: order.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        orderId: item.orderId,
                    })),
                };
                observer.next(response);
                observer.complete();
            });
        });
    }
    getOrder(request) {
        const orderPromise = this.order.findUnique({
            where: { id: request.orderId },
            include: { items: true },
        });
        return (0, rxjs_1.from)(orderPromise).pipe((0, rxjs_1.map)((order) => ({
            order: {
                orderId: order.id,
                createdAt: order.createdAt,
                delivered: order.delivered,
            },
            items: order.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                orderId: item.orderId,
            })),
        })));
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map