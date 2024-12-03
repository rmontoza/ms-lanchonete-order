
const TYPES = {
    OrderUseCase: Symbol.for('OrderUseCase'),
    OrderController: Symbol.for('OrderController'),
    OrderRepository: Symbol.for('OrderRepository'),

    CheckoutUseCase: Symbol.for('CheckoutUseCase'),
    CheckoutController: Symbol.for('CheckoutController'),
    CheckoutRepository: Symbol.for('CheckoutRepository'),

    MessageQueue: Symbol.for('MessageQueue'),


    Database: Symbol.for('Database')
  };

export {TYPES};