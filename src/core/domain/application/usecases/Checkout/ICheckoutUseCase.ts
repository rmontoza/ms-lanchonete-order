import { StatusOrderEnum } from "../../../enums/StatusOrderEnum";

export interface ICheckoutUseCase{
    checkout(id: string, status: StatusOrderEnum): Promise<void>
}