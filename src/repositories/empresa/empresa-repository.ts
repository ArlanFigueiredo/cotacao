import { Empresa, Prisma } from '@prisma/client';

export interface DataValidateCompany{
  userId: string
  cnpj: string
  zip_code: number
  city_work: string
}

export interface EmpresaRepository{
  findById(id: string):Promise<Empresa | null>
  FindEmpresaByData(data: DataValidateCompany): Promise<Empresa | null>
  create(data: Prisma.EmpresaCreateManyInput): Promise<Empresa>
}