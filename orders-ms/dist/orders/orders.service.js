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
        let orderId = undefined;
        this.order
            .create({
            data: {
                createdAt: request.createdAt,
                delivered: request.delivered,
                items: {
                    create: request.items.map((item) => ({
                        quantity: item.quantity,
                        productId: item.productId,
                    })),
                },
            },
        })
            .then((order) => (orderId = order.id));
        console.log('Order created with ID:', orderId);
        const newOrderPromise = this.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });
        return (0, rxjs_1.from)(newOrderPromise).pipe((0, rxjs_1.map)((order) => ({
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