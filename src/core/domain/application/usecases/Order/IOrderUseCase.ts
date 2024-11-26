import Order from '../../../entities/Order/Order';
import OrderItem from '../../../entities/Order/OrderItem';
import { StatusOrderEnum } from '../../../enums/StatusOrderEnum';

export interface IOrderUseCase {
    createOrder(document: string, orderItem: OrderItem[], valueOrder: number): Promise<Order>;
    getOrders(): Promise<Order[]>;
    getOrderByNumber(orderNumber: number): Promise<Order | null>;
    updateStatusOrder(idOrder: string, status: StatusOrderEnum): Promise<void>
  }
