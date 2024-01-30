import { PrismaUserRepository } from '@/repositories/user/prisma-user-repository';
import { UserAlredyExistsError } from '@/error/user/user-alredy-exist-error';
import { RegisterUserModel } from '@/models/user/register';
import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';




export async function register(req: FastifyRequest, res: FastifyReply){

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const {name, email, password} = registerBodySchema.parse(req.body);
    const userRespository = new PrismaUserRepository();
    const userModel = new RegisterUserModel(userRespository);
    try {
        const user = await userModel.create({
            name,
            email,
            password
        });
        return res.status(201).send({
            message: 'Created successfully',
            user
        });
    } catch (error) {
        if(error instanceof UserAlredyExistsError){
            res.status(409).send({
                message: error.message
            });
        }
    }
}
