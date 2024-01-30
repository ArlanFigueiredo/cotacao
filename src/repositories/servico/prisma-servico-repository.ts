import { prisma } from '@/lib/prisma';
import { Prisma, Servico } from '@prisma/client';
import { ServicoRepository } from './servico-repository';
export class PrismaServicoRepository implements ServicoRepository{
    async create(data: Prisma.ServicoCreateManyInput): Promise<Servico>{
        const service = await prisma.servico.create({
            data
        });
        return service;
    }
}