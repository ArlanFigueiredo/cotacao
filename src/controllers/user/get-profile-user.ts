import { UserDoesNotExistsError } from '../../error/user/user-does-not-exists-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { GetProfileUserModel } from '@/models/user/get-profile-user';
import { z } from 'zod';
import { PrismaUserRepository } from '@/repositories/user/prisma-user-repository';
export async function findByEmail(req: FastifyRequest, res:FastifyReply){
    const userRepository = new PrismaUserRepository();
    const getProfileUserModel = new GetProfileUserModel(userRepository);

    const getBodySchema = z.object({
        email: z.string().email(),
    });

    const {email} = getBodySchema.parse(req.params);
    
    try {
        const user = await getProfileUserModel.findByEmail(email);
        return res.status(201).send({
            user
        });
    } catch (error) {
        if(error instanceof UserDoesNotExistsError){
            return res.status(404).send({
                message: error.message
            });
        }
    }
}