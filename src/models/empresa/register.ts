import { PrismaUserRepository } from '@/repositories/user/prisma-user-repository';
import { PrismaEmpresaRepository } from '@/repositories/empresa/prisma-empresa-repository';
import { EmpresaAlredyExistsError } from '@/error/empresa/empresa-alredy-exists-error';
import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists-error';
import { Empresa } from '@prisma/client';

interface RegisterEmpresaModelRequest{
  userId: string
  reason_social: string
  cnpj: string
  zip_code: number
  road: string
  neighborhood: string
  number: number
  city: string
  state: string
  city_work: string
  responsible: string
  contact: string
}

interface RegisterEmpresaModelResponse{
  company: Empresa
}

export class RegisterEmpresaModel{
    constructor(
    private empresaRepository: PrismaEmpresaRepository,
    private userRepository: PrismaUserRepository
    ){}

    async create({
        userId,
        reason_social,
        cnpj,
        zip_code,
        road,
        neighborhood,
        number,
        city,
        state,
        city_work,
        responsible,
        contact,
    }: RegisterEmpresaModelRequest
    ):Promise<RegisterEmpresaModelResponse>{

        const userAlredyExists = await this.userRepository.findById(userId);
        const companyAlredyExists = await this.empresaRepository.FindEmpresaByData({
            userId,
            cnpj,
            zip_code,
            city_work
        });
        
        if(!userAlredyExists){
            throw new UserDoesNotExistsError();
        }

        if(companyAlredyExists){
            throw new EmpresaAlredyExistsError();
        }


        const company = await this.empresaRepository.create({
            userId,
            reason_social,
            cnpj,
            zip_code,
            road,
            neighborhood,
            number,
            city,
            state,
            city_work,
            responsible,
            contact,
        });

        return {
            company,
        };

    }

}