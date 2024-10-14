import { IsArray, IsBoolean } from 'class-validator';
import { OrderItem } from 'src/types/orders';

export class CreateOrderDto {
  @IsBoolean()
  delivered: boolean;

  @IsArray()
  items: OrderItem[];
}
