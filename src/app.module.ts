import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelappModule } from './hotelapp/hotelapp.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hotelapp } from './hotelapp/entities/hotelapp.entity';
import { User } from './auth/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',  
      database: 'hotelapp',
      entities: [Hotelapp, User],
      synchronize: true,
      dropSchema: false,
      logging: true,
    }),HotelappModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
