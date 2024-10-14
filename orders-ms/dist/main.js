"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            url: '0.0.0.0:6000',
            package: 'orders',
            protoPath: (0, path_1.join)(__dirname, '../../proto/orders.proto'),
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map