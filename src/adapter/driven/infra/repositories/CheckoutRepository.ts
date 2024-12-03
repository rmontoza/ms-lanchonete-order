import { inject, injectable } from "inversify";
import { StatusOrderEnum } from "../../../../core/domain/enums/StatusOrderEnum";
import { ICheckoutRepository } from "../../../../core/domain/repositories/ICheckoutRepository";
import { IOrderRepository } from "../../../../core/domain/repositories/IOrderRepository";
import { OrderRepository } from "./OrderRepository";
import { TYPES } from "../../../../../types";

@injectable()
export class CheckoutRepository implements ICheckoutRepository {

    constructor(
        @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository,
      ) {}

    checkout(id: string, status: StatusOrderEnum): Promise<void> {
        
        return this.orderRepository.updateStatusOrder(id, status);

    }
}