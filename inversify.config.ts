import 'reflect-metadata';
import { Container } from 'inversify';
import { OrderUseCase } from './src/core/domain/application/usecases/Order/OrderUseCase';
import { OrderController } from './src/adapter/driver/api/controllers/OrderController';
import { IOrderRepository } from './src/core/domain/repositories/IOrderRepository';
import { OrderRepository } from './src/adapter/driven/infra/repositories/OrderRepository';
import { IOrderUseCase } from './src/core/domain/application/usecases/Order/IOrderUseCase';
import { MongoDatabase } from './src/adapter/driven/infra/databases/MongoDataBase';
import { IDatabase } from './src/adapter/driven/infra/interfaces/IDatabase';
import { TYPES } from './types'
import dotenv from 'dotenv';
import { SQSAdapter } from './src/adapter/driven/infra/messaging/SQSAdapter';
import { CheckoutUseCase } from './src/core/domain/application/usecases/Checkout/CheckoutUseCase';
import { ICheckoutUseCase } from './src/core/domain/application/usecases/Checkout/ICheckoutUseCase';
import { ICheckoutRepository } from './src/core/domain/repositories/ICheckoutRepository';
import { CheckoutController } from './src/adapter/driver/api/controllers/CheckoutController';
import { CheckoutRepository } from './src/adapter/driven/infra/repositories/CheckoutRepository';

dotenv.config();

const container = new Container();

// Bindings
//Use Cases
container.bind<IOrderUseCase>(TYPES.OrderUseCase).to(OrderUseCase);
container.bind<ICheckoutUseCase>(TYPES.CheckoutUseCase).to(CheckoutUseCase);



//Repositorys
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<ICheckoutRepository>(TYPES.CheckoutRepository).to(CheckoutRepository);

//Controllers
container.bind<OrderController>(TYPES.OrderController).to(OrderController);
container.bind<CheckoutController>(TYPES.CheckoutController).to(CheckoutController);


//Databases
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase(`${process.env.MONGODB_URI}`));

container.bind(TYPES.MessageQueue).toDynamicValue(() => {
    const queueUrl = process.env.SQS_QUEUE_URL || 'https://sqs.us-east-1.amazonaws.com/010928185677/sql-lanchonete-checkout';
    return new SQSAdapter(queueUrl);
  });


export { container };

