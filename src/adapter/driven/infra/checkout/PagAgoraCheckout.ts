import { ICheckout } from "../interfaces/ICheckout"

class PagAgoraCheckout  implements ICheckout{
    checkout(): Promise<void> {

        //Aqui podemos implementar um Getway de pagamento externo, como por exemplo o PagSeguro.
        //Mas como sugerido, iremos ter apenas o Checkou incluindo o produto em uma tabela.
        //No nosso caso iremos apenas mudar o status order para PAIDOUT, indicando que a mesma foi PAGA e Finalizada
        //Aqui ficará apenas de exemplo, não será codificado por enquanto.

        
        throw new Error("Method not implemented.");
    }

}