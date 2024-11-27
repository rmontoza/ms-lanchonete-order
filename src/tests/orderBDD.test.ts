import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { OrderUseCase } from '../../src/core/domain/application/usecases/Order/OrderUseCase';
import OrderItem from '../../src/core/domain/entities/Order/OrderItem';
import Order from '../core/domain/entities/Order/Order';

import { IOrderRepository } from '../../src/core/domain/repositories/IOrderRepository';

let orderUseCase: OrderUseCase;
let mockOrderRepository: jest.Mocked<IOrderRepository>;
let createdOrder: Order | null = null;
let orderItems: OrderItem[] = [];
let document: string;

Given('a customer with document {string}', (doc: string) => {
  document = doc;

  mockOrderRepository = {
    createOrder: jest.fn(),
    getOrderByNumber: jest.fn(),
    updateStatusOrder: jest.fn(),
    getOrders: jest.fn(),
  };

  orderUseCase = new OrderUseCase(mockOrderRepository);
});

Given('the following order items:', (table: any) => {
  orderItems = table.raw().map(
    (row: any) => new OrderItem(row[0], parseFloat(row[1]), parseInt(row[2], 10))
  );
});

When('the order is created', async () => {
  const totalValue = orderItems.reduce((sum, item) => sum + (item.valeu || 0) * (item.quanity || 0), 0);

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

Then('the order should have an order number', () => {
  expect(createdOrder).to.have.property('orderNumber');
  expect(createdOrder?.orderNumber).to.be.a('number');
});

Then('the total value should be {int}', (totalValue: number) => {
  expect(createdOrder?.valueOrder).to.equal(totalValue);
});

Then('the order status should be {string}', (status: string) => {
  expect(createdOrder?.status).to.equal(status);
});
