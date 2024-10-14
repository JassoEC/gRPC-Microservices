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
        url: '0.0.0.0:6000',
        package: 'orders',
        protoPath: join(__dirname, '../../proto/orders.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();
