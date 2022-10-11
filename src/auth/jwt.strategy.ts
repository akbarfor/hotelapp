import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interfaces";
import { User } from "./users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    //jwt validation
    async validate(payload : JwtPayload): Promise<User>{
        const {email} = payload;

        const user: User = await this.userRepository.findOne({
            where: {
                email : email
            }
        });
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }}