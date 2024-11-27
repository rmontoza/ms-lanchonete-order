import 'reflect-metadata';
import { OrderUseCase } from '../core/domain/application/usecases/Order/OrderUseCase';
import { IOrderRepository } from '../core/domain/repositories/IOrderRepository';
import Order from '../core/domain/entities/Order/Order';
import OrderItem from '../core/domain/entities/Order/OrderItem';
import { StatusOrderEnum } from '../core/domain/enums/StatusOrderEnum';
import { ValidationError, NotFoundError } from '../core/domain/erros/DomainErros';

describe('OrderUseCase', () => {
  let orderUseCase: OrderUseCase;
  let mockOrderRepository: jest.Mocked<IOrderRepository>;

  beforeEach(() => {
    mockOrderRepository = {
      createOrder: jest.fn(),
      getOrderByNumber: jest.fn(),
      updateStatusOrder: jest.fn(),
      getOrders: jest.fn(),
    };

    orderUseCase = new OrderUseCase(mockOrderRepository);
  });

  it('should create a new order successfully', async () => {
    const orderItems: OrderItem[] = [
      new OrderItem('item1', 100, 2),
    ];
    const document = '12345678901';
    const valueOrder = 200;

    const createdOrder = new Order(
      '1',
      12345,
      document,
      '',
      orderItems,
      valueOrder,
      new Date()
    );

    mockOrderRepository.createOrder.mockResolvedValue(createdOrder);

    const result = await orderUseCase.createOrder(document, orderItems, valueOrder);

    expect(mockOrderRepository.createOrder).toHaveBeenCalled();
    expect(result).toEqual(createdOrder);
  });

  it('should throw an error when creating an order with no items', async () => {
    const document = '12345678901';
    const emptyItems: OrderItem[] = [];
    const valueOrder = 200;

    await expect(() =>
      orderUseCase.createOrder(document, emptyItems, valueOrder)
    ).rejects.toThrowError(new ValidationError('Order without items'));

    expect(mockOrderRepository.createOrder).not.toHaveBeenCalled();
  });

  it('should retrieve an order by its number', async () => {
    const orderNumber = 12345;
    const expectedOrder = new Order(
      '1',
      orderNumber,
      '12345678901',
      '',
      [new OrderItem('item1', 100, 1)],
      100,
      new Date()
    );

    mockOrderRepository.getOrderByNumber.mockResolvedValue(expectedOrder);

    const result = await orderUseCase.getOrderByNumber(orderNumber);

    expect(mockOrderRepository.getOrderByNumber).toHaveBeenCalledWith(orderNumber);
    expect(result).toEqual(expectedOrder);
  });

  it('should throw an error when an order is not found by its number', async () => {
    const orderNumber = 99999;

    mockOrderRepository.getOrderByNumber.mockResolvedValue(null);

    await expect(orderUseCase.getOrderByNumber(orderNumber)).rejects.toThrowError(
      new NotFoundError('Order not found!')
    );
  });

  it('should update the order status successfully', async () => {
    const orderId = '1';
    const newStatus = StatusOrderEnum.PREPARING;

    mockOrderRepository.updateStatusOrder.mockResolvedValue();

    await orderUseCase.updateStatusOrder(orderId, newStatus);

    expect(mockOrderRepository.updateStatusOrder).toHaveBeenCalledWith(orderId, newStatus);
  });

  it('should throw an error for invalid order status', async () => {
    const orderId = '1';
    const invalidStatus = 'INVALID_STATUS' as StatusOrderEnum;

    await expect(() =>
      orderUseCase.updateStatusOrder(orderId, invalidStatus)
    ).rejects.toThrowError(new ValidationError(`Invalid order status: ${invalidStatus}`));

    expect(mockOrderRepository.updateStatusOrder).not.toHaveBeenCalled();
  });

  it('should retrieve all orders', async () => {
    const orders = [
      new Order('1', 12345, '12345678901', '', [], 100, new Date()),
      new Order('2', 54321, '98765432109', '', [], 150, new Date()),
    ];

    mockOrderRepository.getOrders.mockResolvedValue(orders);

    const result = await orderUseCase.getOrders();

    expect(mockOrderRepository.getOrders).toHaveBeenCalled();
    expect(result).toEqual(orders);
  });
});
