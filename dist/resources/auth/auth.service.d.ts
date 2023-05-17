import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { SigninUserDto } from './dto/signin-user.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signin(body: SigninUserDto): Promise<{
        token: string;
    }>;
}
