import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct({ productId: id });
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      availableQuantity: dto.availableQuantity,
    });
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productsService.updateProduct({
      productId: id,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      availableQuantity: dto.availableQuantity,
    });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct({ productId: id });
  }
}
