import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterServicoModel } from '@/models/servico/register';
import { PrismaServicoRepository } from '@/repositories/servico/prisma-servico-repository';
import { PrismaEmpresaRepository } from '@/repositories/empresa/prisma-empresa-repository';
import { z } from 'zod';
import { EmpresaDoesNotExistsError } from '@/error/empresa/empresa-does-not-exists-error';
export async function registerService(req: FastifyRequest, res:FastifyReply){

    const registerEmpresaIdSchema = z.object({
        empresaId: z.string()
    });

    const registerBodySchema = z.object({
        service_type: z.string(),
        unit: z.string(),
        unit_price: z.number(),
        amount: z.number(),
        total_price: z.number()
    });

    const { empresaId } = registerEmpresaIdSchema.parse(req.params);
    const { 
        service_type,
        unit,
        unit_price,
        amount,
        total_price
    } = registerBodySchema.parse(req.body);

    const empresaRepository = new PrismaEmpresaRepository();
    const servicoRepository = new PrismaServicoRepository();
    const registerServicoModel = new RegisterServicoModel(
        empresaRepository,
        servicoRepository
    );

    try {
        const company = await registerServicoModel.execute({
            empresaId,
            service_type,
            unit,
            amount,
            unit_price,
            total_price
        });
        return res.status(201).send({
            message: 'Created service successfully',
            company
        });
    } catch (error) {
        if(error instanceof EmpresaDoesNotExistsError){
            return res.status(409).send({
                message: error.message
            });
        }
    }
}