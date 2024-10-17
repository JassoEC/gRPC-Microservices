import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from './config';
import { Product as ProductEntity } from './products/entities/Product';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      password: envs.DB_PASSWORD,
      username: envs.DB_USER,
      database: envs.DB_NAME,
      entities: [ProductEntity],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
