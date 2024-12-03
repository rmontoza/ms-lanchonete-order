import { StatusOrderEnum } from "../enums/StatusOrderEnum";

export interface ICheckoutRepository{
    checkout(id: string, status: StatusOrderEnum): Promise<void>
}