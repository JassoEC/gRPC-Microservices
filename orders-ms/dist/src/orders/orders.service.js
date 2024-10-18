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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_1 = require("../types/products");
const Order_entity_1 = require("./entities/Order.entity");
const OrderItem_entity_1 = require("./entities/OrderItem.entity");
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(client, ordersRepository, itemsRepository) {
        this.client = client;
        this.ordersRepository = ordersRepository;
        this.itemsRepository = itemsRepository;
        this.logger = new common_1.Logger(OrdersService_1.name);
    }
    onModuleInit() {
        this.productsService = this.client.getService(products_1.PRODUCTS_SERVICE_NAME);
    }
    async createOrder(request) {
        try {
            const { items } = request;
            const { products } = await (0, rxjs_1.firstValueFrom)(this.productsService
                .listProducts({
                ids: items.map((item) => item.productId),
            })
                .pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(`Error fetching products: ${error}`);
                throw new microservices_1.RpcException(`Error fetching products: ${error}`);
            })));
            const newOrder = await this.ordersRepository.save(new Order_entity_1.Order());
            await Promise.all(items.map((item) => {
                return this.itemsRepository.save({
                    order: newOrder,
                    productId: item.productId,
                    quantity: item.quantity,
                });
            }));
            const order = await this.ordersRepository.findOne({
                where: { id: newOrder.id },
                relations: ['items'],
            });
            return this.entityToProtoBuf(order, products);
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async getOrder(request) {
        const order = await this.ordersRepository.findOne({
            where: { id: request.orderId },
            relations: ['items'],
        });
        if (!order) {
            this.logger.error(`Order with id ${request.orderId} not found`);
            throw new microservices_1.RpcException(`Order with id ${request.orderId} not found`);
        }
        const products$ = this.productsService.listProducts({
            ids: order.items.map((item) => item.productId),
        });
        if (!products$) {
            this.logger.error(`Error fetching products`);
            throw new microservices_1.RpcException(`Error fetching products`);
        }
        const products = await (0, rxjs_1.firstValueFrom)(products$);
        return this.entityToProtoBuf(order, products.products);
    }
    entityToProtoBuf(order, products) {
        return {
            orderId: order.id,
            createdAt: order.createdAt.toString(),
            items: order.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                orderId: item.orderId,
                product: products.find((product) => product.productId === item.productId),
            })),
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(products_1.PRODUCTS_PACKAGE_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(Order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(OrderItem_entity_1.OrderItem)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map