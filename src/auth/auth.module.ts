import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './users.entity';

@Module({
  imports : [PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: 'topsecret51',
        signOptions: {
          expiresIn: 3600 //dalam hitungan detik
        }
      }),
    
    
    TypeOrmModule.forFeature([User])],
  controllers : [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports : [JwtStrategy, PassportModule]
})
export class AuthModule {}
