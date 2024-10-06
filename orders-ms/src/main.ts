import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'orders',
        protoPath: join(__dirname, '../../proto/orders.proto'),
        url: 'localhost:5001',
      },
    },
  );

  await app.listen();
}
bootstrap();
