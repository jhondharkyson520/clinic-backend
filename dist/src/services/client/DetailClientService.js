"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailClientService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailClientService {
    async execute({ id }) {
        const client = await prisma_1.default.clients.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                email: true,
                cpf: true,
                telefone: true,
                endereco: true,
                dataVencimento: true,
                valorPlano: true,
                quantidadeSessoes: true,
                situacao: true,
            }
        });
        return client;
    }
}
exports.DetailClientService = DetailClientService;
