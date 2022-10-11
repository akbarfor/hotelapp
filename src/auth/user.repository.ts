import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { DataSource, Repository } from "typeorm";
import { User } from "./users.entity";
import * as bcrypt from "bcrypt-nodejs";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }
    //untuk create user / signup

    async createUser(authCredentialDto : AuthCredentialsDto): Promise <void>{
        const{username,password,email,hp} = authCredentialDto;
        const salt = await  bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password : hashedPassword, email, hp});
        
        try{
            const data= this.save(user)
            await this.save(user);
        }catch(error){
            if(error.code === '23505'){
                //duplicate username
                throw new ConflictException(' or email already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }

    }


}