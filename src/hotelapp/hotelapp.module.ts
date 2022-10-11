import { Module } from '@nestjs/common';
import { HotelAppService } from './hotelapp.service';
import { HotelappController } from './hotelapp.controller';
import { Hotelapp } from './entities/hotelapp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HotelAppRepository } from './hotelapp.repository';

@Module({
  imports : [AuthModule,TypeOrmModule.forFeature([Hotelapp])],
  controllers: [HotelappController],
  providers: [HotelAppService, HotelAppRepository]
})
export class HotelappModule {}
