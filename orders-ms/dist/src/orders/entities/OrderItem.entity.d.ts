import { Order } from './Order.entity';
export declare class OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    order: Order;
}
