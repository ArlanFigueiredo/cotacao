import  {FastifyInstance} from 'fastify';
import { register } from '@/controllers/user/register';
import { findByEmail } from '@/controllers/user/get-profile-user';
import { registerCompany } from '@/controllers/empresa/register';
import { registerService } from '@/controllers/servico/register';
export async function appRoutes(app: FastifyInstance){
    app.post('/users', register);
    app.get('/user/:email', findByEmail);


    app.post('/company/:userId', registerCompany);
    
    app.post('service/:empresaId', registerService);
}