import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './dto/get-user.decorator';
import { User } from './users.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto : AuthCredentialsDto) : Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body()authCredentialsdto : AuthCredentialsDto) : Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialsdto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard)
    // login(@Body() authCredentialsDto: AuthCredentialsDto,
    // @GetUser() User:User){
    //     return this.authService.signIn(authCredentialsDto,user)
    // }
}
