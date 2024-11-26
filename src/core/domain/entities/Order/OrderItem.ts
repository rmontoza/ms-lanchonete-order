export default class OrderItem{
    public item?: string;
    public valeu?: number;
    public quanity?: number;

    constructor(item: string, value: number, quantity: number ) {
        this.item = item;
        this.valeu = value;
        this.quanity = quantity;
      }
}