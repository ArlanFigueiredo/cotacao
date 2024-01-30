import { User } from '@prisma/client';
import { UserAlredyExistsError } from '@/error/user/user-alredy-exist-error';
import { UserRepository } from '@/repositories/user/user-repository';

interface RegisterUserModelRequest{
  name: string,
  email: string,
  password: string
}

interface RegisterUserModelResponse{
  user: User
}

export class RegisterUserModel{
  
    constructor(
    private userRepository: UserRepository
    ){}
  
    async create({name, email, password}:RegisterUserModelRequest): Promise<RegisterUserModelResponse>{
      
        const userWhiteSameEmail = await this.userRepository.findByEmail(email);

        if(userWhiteSameEmail){
            throw new UserAlredyExistsError();
        }

        const user = await this.userRepository.create({
            name,
            email,
            password
        });
        return {
            user
        };
    }
}