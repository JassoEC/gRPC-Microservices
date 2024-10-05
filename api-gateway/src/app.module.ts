import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ProductsModule],
})
export class AppModule {}
