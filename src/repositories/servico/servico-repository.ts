import { Prisma, Servico } from '@prisma/client';

export interface ServicoRepository{
  create(data: Prisma.ServicoCreateManyInput):Promise<Servico>
}