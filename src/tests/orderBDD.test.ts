import { loadFeature, defineFeature } from 'jest-cucumber';
import { OrderUseCase } from '../../src/core/domain/application/usecases/Order/OrderUseCase';
import Order from '../core/domain/entities/Order/Order';
import OrderItem from '../core/domain/entities/Order/OrderItem';
import { IOrderRepository } from '../../src/core/domain/repositories/IOrderRepository';
import { IMessageQueue } from '../adapter/driven/infra/repositories/IMessageQueue';

const feature = loadFeature('src/tests/features/order.feature');

let orderUseCase: OrderUseCase;
let mockOrderRepository: jest.Mocked<IOrderRepository>;
let mockMessageQueue: jest.Mocked<IMessageQueue>;
let createdOrder: Order | null = null;
let orderItems: OrderItem[] = [];
let document: string;

defineFeature(feature, (test) => {
  test('Create a new order and verify it exists', ({ given, and, when, then }) => {
    jest.setTimeout(15000); // Aumenta o timeout, se necessário

    given('a customer with document "12345678901"', () => {
      document = '12345678901';


      mockMessageQueue = {
        sendMessage: jest.fn(),
      };

      mockOrderRepository = {
        createOrder: jest.fn(),
        getOrderByNumber: jest.fn(),
        updateStatusOrder: jest.fn(),
        getOrders: jest.fn(),
      };

      orderUseCase = new OrderUseCase(mockOrderRepository, mockMessageQueue);
    });

    and('the following order items:', (table) => {
      orderItems = table.map(
        (row: string[]) => new OrderItem(row[0], parseFloat(row[1]), parseInt(row[2], 10))
      );
    });

    when('the order is created', async () => {
      const totalValue = orderItems.reduce(
        (sum, item) => sum + (item.valeu || 0) * (item.quanity || 0),
        0
      );

      const newOrder = new Order(
        '1',
        12345,
        document,
        'CREATED',
        orderItems,
        totalValue,
        new Date()
      );

      mockOrderRepository.createOrder.mockResolvedValue(newOrder);

      createdOrder = await orderUseCase.createOrder(document, orderItems, totalValue);
    });

    then('the order should be retrievable by its number', async () => {
      const orderNumber = 12345;

      mockOrderRepository.getOrderByNumber.mockResolvedValue(createdOrder);

      const retrievedOrder = await orderUseCase.getOrderByNumber(orderNumber);

      expect(mockOrderRepository.getOrderByNumber).toHaveBeenCalledWith(orderNumber);
      expect(retrievedOrder).toEqual(createdOrder);
    });
  });
});
