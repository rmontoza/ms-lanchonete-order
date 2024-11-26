import express, { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { IOrderUseCase } from '../../../../core/domain/application/usecases/Order/IOrderUseCase';
import { TYPES } from '../../../../../types';
import { HandleError } from './errors/HandleError';

const err = new HandleError();


@injectable()
export class OrderController {
  private router = express.Router();

  constructor(
    @inject(TYPES.OrderUseCase) private readonly orderUseCase: IOrderUseCase,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/orders', this.createOrder.bind(this));
    this.router.get('/api/orders', this.getOrders.bind(this));
    this.router.get('/api/order-by-number/:orderNumber', this.getOrderByNumber.bind(this));
    this.router.put('/api/order-status', this.updateStatusOrder.bind(this));

  }
  /**
   * @swagger
   * tags:
   *   - name: Order
   *     description: Operações relacionadas a Pedidos
   */

   /**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Order]
 *     summary: Cria um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *               orderItem:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item:
 *                       type: string
 *                     value:
 *                       type: number
 *                     quanity:
 *                       type: number
 *               valueOrder:
 *                 type: number 
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 orderItem:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         type: string
 *                       value:
 *                         type: number
 *                       quanity:
 *                         type: number
 *                 valueOrder:
 *                   type: number
 *       500:
 *         description: Erro interno do servidor
 */
  private async createOrder(req: Request, res: Response) {
    try {
      const { document, status, orderItem, valueOrder } = req.body;
      const order = await this.orderUseCase.createOrder(document, orderItem, valueOrder);
      res.status(201).json(order);
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      err.handleError(res, error);
    }
  }

  /**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Order]
 *     summary: Consulta a lista de pedidos
 *     responses:
 *       200:
 *         description: Pedidos consultado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 orderItem:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         type: string
 *                       value:
 *                         type: number
 *                       quanity:
 *                         type: number
 *                 valueOrder:
 *                   type: number
 *       500:
 *         description: Erro interno do servidor
 */
  private async getOrders(req: Request, res: Response){
    try {
      const orders = await this.orderUseCase.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }


  /**
 * @swagger
 * /api/order-by-number/{orderNumber}:
 *   get:
 *     tags: [Order]
 *     summary: Consulta Pedido por Número Pedido
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         schema:
 *           type: number
 *         required: true
 *         description: Numero do pedido
 *     responses:
 *       200:
 *         description: Pedido consultado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 orderItem:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item:
 *                         type: string
 *                       value:
 *                         type: number
 *                       quanity:
 *                         type: number
 *                 valueOrder:
 *                   type: number
 *       500:
 *         description: Erro interno do servidor
 */

  private async getOrderByNumber(req: Request, res: Response){
    try {

      const { orderNumber } = req.params;

      const orders = await this.orderUseCase.getOrderByNumber(Number.parseInt(orderNumber));
      res.status(200).json(orders);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      err.handleError(res, error);
    }
  }

    /**
 * @swagger
 * /api/order-status:
 *   put:
 *     tags: [Order]
 *     summary: Atualiza o status do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idOrder:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ['CREATED', 'PREPARING', 'FINISHED', 'PAIDOUT']
 *               
 *     responses:
 *       204:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro interno do servidor
 */
  private async updateStatusOrder(req: Request, res: Response){
    try {
      const { idOrder, status} = req.body;
      const orders = await this.orderUseCase.updateStatusOrder(idOrder, status);
      res.status(204).json(orders);
    } catch (error) {
      console.error('Erro ao atualizar o status pedido:', error);
      err.handleError(res, error);
    }
  }

  public getRouter() {
    return this.router;
  }
}
