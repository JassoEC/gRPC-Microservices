import { OrderItem } from './OrderItem.entity';
export declare class Order {
    id: string;
    delivered: boolean;
    createdAt: Date;
    items: OrderItem[];
}
