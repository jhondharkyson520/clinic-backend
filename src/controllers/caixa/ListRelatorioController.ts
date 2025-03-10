import {Request, Response} from "express";
import {ListRelatorioService} from "../../services/caixa/ListRelatorioService";
import {Decimal} from '@prisma/client/runtime/library';
import {ListAtrasadosService} from "../../services/caixa/ListAtrasadosService";

interface Caixa {
  id: string;
  dataOperacao: Date;
  valorPlano: Decimal;
  valorAberto: Decimal;
  valorPago: Decimal;
  client?: {
    id: string;
    name: string;
  };
}

interface RelatorioResponse {
  faturamentoMensal: number;
  faturamentoAnual: number;
  valoresAtrasados: number;
}

class ListRelatorioController {
  async handle(req: Request, res: Response) {
    const listRelatorio = new ListRelatorioService();
    const caixas: Caixa[] = await listRelatorio.execute();
    const listAtrasadosService = new ListAtrasadosService();
    const listClientAberto = await listAtrasadosService.execute();
    let faturamentoMensalTemp = 0;
    let faturamentoAnualTemp = 0;
    let valoresAtrasadosTemp = 0;
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    caixas.forEach((caixa) => {
      const valorPago = parseFloat(caixa.valorPago.toString());      
      if (caixa.dataOperacao.getMonth() + 1 === mesAtual && caixa.dataOperacao.getFullYear() === anoAtual) {
        faturamentoMensalTemp += valorPago;
      }
      if (caixa.dataOperacao.getFullYear() === anoAtual) {
        faturamentoAnualTemp += valorPago;
      }
    });

    listClientAberto.forEach((caixa) => {
      const valorAberto = parseFloat(caixa.valorAberto.toString());
      if (valorAberto < 0) {
        valoresAtrasadosTemp += valorAberto;
      }
    });
    
    const response: RelatorioResponse = {
      faturamentoMensal: faturamentoMensalTemp,
      faturamentoAnual: faturamentoAnualTemp,
      valoresAtrasados: valoresAtrasadosTemp,
    };

    return res.json(response);
  }
}

export { ListRelatorioController };
