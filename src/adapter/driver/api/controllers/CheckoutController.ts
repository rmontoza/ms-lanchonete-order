import { inject, injectable } from "inversify";
import { ICheckoutUseCase } from "../../../../core/domain/application/usecases/Checkout/ICheckoutUseCase";
import { TYPES } from "../../../../../types";
import express, { Request, Response } from 'express';
import { HandleError } from "./errors/HandleError";
import { StatusOrderEnum } from "../../../../core/domain/enums/StatusOrderEnum";

const err = new HandleError();


@injectable()
export class CheckoutController {
    private router = express.Router();
  
    constructor(
      @inject(TYPES.CheckoutUseCase) private checkoutUseCase: ICheckoutUseCase,
    ) {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post('/api/checkout', this.checkout.bind(this));
  
    }

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     tags: [Checkout]
 *     summary: Confirma o pedido como PAGO
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idOrder:
 *                 type: string
 *               
 *     responses:
 *       204:
 *         description: Checkout realizado sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro interno do servidor
 */
    private async checkout(req: Request, res: Response) {
        try {
          const { idOrder } = req.body;
          const order = await this.checkoutUseCase.checkout(idOrder, StatusOrderEnum.PAIDOUT);
          res.status(204).json(order);
        } catch (error) {
          err.handleError(res, error);
        }
      }

      public getRouter() {
        return this.router;
      }
}