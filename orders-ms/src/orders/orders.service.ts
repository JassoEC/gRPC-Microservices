import { Injectable } from '@nestjs/common';
import { GetOrderResponse } from 'src/types/orders';

@Injectable()
export class OrdersService {
  getOrder(orderId: string): GetOrderResponse {
    return {
      orderId,
      items: [
        {
          productId: '1',
          quantity: 1,
        },
      ],
    };
  }
}
