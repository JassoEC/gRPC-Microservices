"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_module_1 = require("./orders/orders.module");
const config_1 = require("../config");
const Order_entity_1 = require("./orders/entities/Order.entity");
const OrderItem_entity_1 = require("./orders/entities/OrderItem.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            orders_module_1.OrdersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: config_1.envs.DB_HOST,
                port: config_1.envs.DB_PORT,
                password: config_1.envs.DB_PASSWORD,
                username: config_1.envs.DB_USER,
                database: config_1.envs.DB_NAME,
                entities: [Order_entity_1.Order, OrderItem_entity_1.OrderItem],
                synchronize: true,
                logging: true,
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map