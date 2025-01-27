import prismaClient from "../../prisma";
import { DateTime } from "luxon"; 
import { parse } from 'date-fns';

interface ClientRequest {
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  dataVencimento?: string | null;
  valorPlano: number;
  quantidadeSessoes?: number | null;
  situacao: boolean;
}

class CreateClientService {
  async execute({
    name,
    email,
    cpf,
    telefone,
    endereco,
    dataVencimento,
    valorPlano,
    quantidadeSessoes,
    situacao,
  }: ClientRequest) {
    console.log('dataVencimento (Backend - Início):', dataVencimento);

    if (
      name === "" ||
      email === "" ||
      cpf === "" ||
      telefone === "" ||
      endereco === "" ||
      valorPlano === null ||
      situacao === undefined
    ) {
      throw new Error("Preencha todos os campos!");
    }

    const formattedDataVencimento = dataVencimento
      ? parse(dataVencimento, 'dd/MM/yyyy', new Date())
      : null;
    


    const client = await prismaClient.clients.create({
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

    //console.log('dataVencimento:', formattedDataVencimento);

    return client;
  }
}

export { CreateClientService };