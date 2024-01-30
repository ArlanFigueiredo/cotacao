import { UserDoesNotExistsError } from '@/error/user/user-does-not-exists-error';
import { UserRepository } from '@/repositories/user/user-repository';
export class GetProfileUserModel{
    constructor(
    private userRepository: UserRepository
    ){}

    async findByEmail(email: string){
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new UserDoesNotExistsError;
        }

        return {
            user
        };
    }
}