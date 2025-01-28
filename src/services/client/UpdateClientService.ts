import prismaClient from '../../prisma';
import { parse } from 'date-fns';

interface UpdateClientRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  dataVencimento: string | null;
  valorPlano: number;
  quantidadeSessoes: number | null;
  situacao: boolean;
}

class UpdateClientService {
  async execute({
    id,
    name,
    email,
    cpf,
    telefone,
    endereco,
    dataVencimento,
    valorPlano,
    quantidadeSessoes,
    situacao,
  }: UpdateClientRequest) {
    if (!id) {
      throw new Error("É necessário fornecer o ID do cliente para a atualização.");
    }

    const parsedDataVencimento = dataVencimento
      ? parse(dataVencimento, 'dd/MM/yyyy', new Date())
      : null;

    try {
    const client = await prismaClient.clients.update({
      where: { id },
      data: {
        name,
        email,
        cpf,
        telefone,
        endereco,
        dataVencimento: parsedDataVencimento,
        valorPlano,
        quantidadeSessoes: quantidadeSessoes !== null ? quantidadeSessoes : undefined,
        situacao,
      },
    });

    return client;
    } catch(error) {
      throw new Error(`Erro ao atualizar cliente: ${error.message}`);
    }
  }

}

export { UpdateClientService };
