import { EmpresaDoesNotExistsError } from '@/error/empresa/empresa-does-not-exists-error';
import { Servico } from '@prisma/client';
import { PrismaServicoRepository } from '@/repositories/servico/prisma-servico-repository';
import { PrismaEmpresaRepository } from '@/repositories/empresa/prisma-empresa-repository';

interface RegisterServicoModelRequest{
  empresaId: string;
  service_type: string;
  unit: string;
  amount: number;
  unit_price: number;
  total_price: number;
}

interface RegisterServicoModelResponse{
  service: Servico;
}

export class RegisterServicoModel{
    constructor(
    private empresaRepository: PrismaEmpresaRepository,
    private servicoRepository: PrismaServicoRepository
    ){}

    async execute({
        empresaId, 
        service_type, 
        unit, 
        amount, 
        unit_price, 
        total_price
    }:RegisterServicoModelRequest):Promise<RegisterServicoModelResponse>{

        const company = await this.empresaRepository.findById(empresaId);

        if(!company){
            throw new EmpresaDoesNotExistsError();
        }

        const service = await this.servicoRepository.create({
            empresaId,
            service_type,
            unit,
            unit_price,
            amount,
            total_price
        });

        return {
            service
        };
    }
}