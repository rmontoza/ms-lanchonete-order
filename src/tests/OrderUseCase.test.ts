import { OrderUseCase } from '../../src/core/domain/application/usecases/Order/OrderUseCase';
import { IOrderRepository } from '../../src/core/domain/repositories/IOrderRepository';
import { IMessageQueue } from '../adapter/driven/infra/repositories/IMessageQueue';
import Order from '../core/domain/entities/Order/Order';
import OrderItem from '../core/domain/entities/Order/OrderItem';

describe('OrderUseCase', () => {
  let orderUseCase: OrderUseCase;
  let mockOrderRepository: jest.Mocked<IOrderRepository>;
  let mockMessageQueue: jest.Mocked<IMessageQueue>;


  beforeEach(() => {
    mockOrderRepository = {
      createOrder: jest.fn(),
      getOrderByNumber: jest.fn(),
      updateStatusOrder: jest.fn(),
      getOrders: jest.fn(),
    };

    
    mockMessageQueue = {
      sendMessage: jest.fn(),
    };

    orderUseCase = new OrderUseCase(mockOrderRepository, mockMessageQueue);
  });

  it('should create an order with items', async () => {
    const orderItems: OrderItem[] = [
      new OrderItem('item1', 100, 2),
      new OrderItem('item2', 50, 1),
    ];
    const document = '12345678901';
    const valueOrder = 250;

    const createdOrder = new Order(
      '1',
      12345,
      document,
      'CREATED',
      orderItems,
      valueOrder,
      new Date()
    );

    mockOrderRepository.createOrder.mockResolvedValue(createdOrder);

    const result = await orderUseCase.createOrder(document, orderItems, valueOrder);

    expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(expect.any(Order));
    expect(result).toEqual(createdOrder);
  });

  it('should verify if the created order exists', async () => {
    const orderNumber = 12345;
    const existingOrder = new Order(
      '1',
      orderNumber,
      '12345678901',
      'CREATED',
      [],
      250,
      new Date()
    );

    mockOrderRepository.getOrderByNumber.mockResolvedValue(existingOrder);

    const result = await orderUseCase.getOrderByNumber(orderNumber);

    expect(mockOrderRepository.getOrderByNumber).toHaveBeenCalledWith(orderNumber);
    expect(result).toEqual(existingOrder);
  });
});
