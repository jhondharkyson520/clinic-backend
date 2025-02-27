import prismaClient from "../../prisma";

interface DetailRequest {
    id: string;
}

class DetailClientService {
    async execute({id}: DetailRequest) {
        const client = await prismaClient.clients.findUnique({
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

export {DetailClientService};
