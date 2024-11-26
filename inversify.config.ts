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
dotenv.config();

const container = new Container();

// Bindings
//Use Cases
container.bind<IOrderUseCase>(TYPES.OrderUseCase).to(OrderUseCase);


//Repositorys
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);

//Controllers
container.bind<OrderController>(TYPES.OrderController).to(OrderController);


//Databases
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase(`${process.env.MONGODB_URI}`));

export { container };

