"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const date_fns_1 = require("date-fns");
class CreateClientService {
    async execute({ name, email, cpf, telefone, endereco, dataVencimento, valorPlano, quantidadeSessoes, situacao, }) {
        if (name === "" ||
            email === "" ||
            cpf === "" ||
            telefone === "" ||
            endereco === "" ||
            valorPlano === null ||
            situacao === undefined) {
            throw new Error("Preencha todos os campos!");
        }
        const formattedDataVencimento = dataVencimento
            ? (0, date_fns_1.parse)(dataVencimento, 'dd/MM/yyyy', new Date())
            : null;
        const client = await prisma_1.default.clients.create({
            data: {
                name: name,
                email: email,
                cpf: cpf,
                telefone: telefone,
                endereco: endereco,
                valorPlano: valorPlano,
                dataVencimento: formattedDataVencimento || null,
                quantidadeSessoes: quantidadeSessoes || null,
                situacao: situacao,
            },
            select: {
                id: true,
                name: true,
                telefone: true,
                valorPlano: true,
                dataVencimento: true,
                situacao: true,
            },
        });
        return client;
    }
}
exports.CreateClientService = CreateClientService;
