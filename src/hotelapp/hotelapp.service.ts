import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelappDto } from './dto/create-hotelapp.dto';
import { UpdateHotelappDto } from './dto/update-hotelapp.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Hotelapp } from './entities/hotelapp.entity';
import { GetHotelAppStatusFilterDto } from './dto/get-hotelapp.filter.dto';
import { HotelAppRepository } from './hotelapp.repository';
import { Repository } from 'typeorm';

@Injectable()
export class HotelAppService {
constructor(
  private hotelappRepository : HotelAppRepository,
){}

getHotelApp(filterDto : GetHotelAppStatusFilterDto) : Promise<Hotelapp[]>{
  return this.hotelappRepository.getHotelApp(filterDto);
}

createHotelApp(createTaskDto : CreateHotelappDto) : Promise<Hotelapp>{
  return this.hotelappRepository.createHotelApp(createTaskDto);    
}

async getHotelAppById(id: string): Promise<Hotelapp> {
  //findOne(id)
  const found = await this.hotelappRepository.findOne({ where : {id : id}});
  if(!found){
      throw new NotFoundException('Hotel Was Not found');
  }

  return found;
}

async updateHotelApp(id: string, createHotelAppDto: UpdateHotelappDto){
  return await this.hotelappRepository.updateTasks(id, createHotelAppDto)

}

async deleteHotelApp(id: string){
  return await this.hotelappRepository.deleteTasks(id);
}

}