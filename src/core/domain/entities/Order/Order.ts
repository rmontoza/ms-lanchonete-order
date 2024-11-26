import OrderItem from "./OrderItem";

export default class Order {
    public id: string;
    public orderNumber?: number;
    public document?: string;
    public status?: string;
    public orderItem: OrderItem[];
    public valueOrder: number;
    public dateCreate: Date;
  
    constructor(id: string, orderNumber: number, document: string, status: string, orderItem: OrderItem[], valueOrder: number, dateCreate: Date ) {
      this.id = id;
      this.orderNumber = orderNumber;
      this.document = document;
      this.status = status;
      this.orderItem = orderItem;
      this.valueOrder = valueOrder;
      this.dateCreate = dateCreate;
    }
  }
  