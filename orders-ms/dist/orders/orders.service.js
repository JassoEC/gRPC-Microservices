"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const rxjs_1 = require("rxjs");
let OrdersService = class OrdersService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('OrdersService');
    }
    async onModuleInit() {
        await this.$connect();
    }
    createOrder(request) {
        const newOrderPromise = this.order.create({
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
        });
        return (0, rxjs_1.from)(newOrderPromise).pipe((0, rxjs_1.map)((order) => ({
            order: {
                orderId: order.id,
                createdAt: order.createdAt,
                delivered: order.delivered,
            },
            items: [],
        })));
        return undefined;
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
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map