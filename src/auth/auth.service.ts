import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt-nodejs';
import { JwtPayload} from "./jwt-payload.interfaces";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService,
    ){}

    //signup
    async signUp(authCredentialDto : AuthCredentialsDto) : Promise<void>{
        return this.userRepository.createUser(authCredentialDto);
    }

    //signin dengan jwt
    async signIn(authCredentialDto: AuthCredentialsDto) : Promise<{accessToken: string}>{
        const {email, password}= authCredentialDto;
        const user = await this.userRepository.findOne({
            where:{
                email:email
            }
        });

        if(user && (await bcrypt.compare(password,user.password))){
            const payload: JwtPayload = {email};
            const accessToken: string = await this.jwtService.sign(payload);
            return {accessToken};
        }else{
            throw new UnauthorizedException('Please check your login credential')
        }
    }


}