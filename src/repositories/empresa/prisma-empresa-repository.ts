import { prisma } from '@/lib/prisma';
import { Empresa, Prisma } from '@prisma/client';
import { EmpresaRepository, DataValidateCompany } from './empresa-repository';
export class PrismaEmpresaRepository implements EmpresaRepository{

    async findById(id: string): Promise<Empresa | null>{
        const company = await prisma.empresa.findUnique({
            where: {
                id
            }
        });

        return company;
    }

    async FindEmpresaByData(data: DataValidateCompany): Promise<Empresa | null>{
        const company = await prisma.empresa.findFirst({
            where: data
        });
        return company;
    }

    async create(data: Prisma.EmpresaCreateManyInput): Promise<Empresa>{
        const empresa = await prisma.empresa.create({
            data
        });
        return empresa;
    }
}