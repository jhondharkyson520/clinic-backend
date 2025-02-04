"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRelatorioController = void 0;
const ListRelatorioService_1 = require("../../services/caixa/ListRelatorioService");
const ListAtrasadosService_1 = require("../../services/caixa/ListAtrasadosService");
class ListRelatorioController {
    async handle(req, res) {
        const listRelatorio = new ListRelatorioService_1.ListRelatorioService();
        const caixas = await listRelatorio.execute();
        const listAtrasadosService = new ListAtrasadosService_1.ListAtrasadosService();
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
        const response = {
            faturamentoMensal: faturamentoMensalTemp,
            faturamentoAnual: faturamentoAnualTemp,
            valoresAtrasados: valoresAtrasadosTemp,
        };
        return res.json(response);
    }
}
exports.ListRelatorioController = ListRelatorioController;
