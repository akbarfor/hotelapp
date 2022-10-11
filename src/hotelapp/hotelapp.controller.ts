import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HotelAppService } from './hotelapp.service';
import { CreateHotelappDto } from './dto/create-hotelapp.dto';
import { UpdateHotelappDto } from './dto/update-hotelapp.dto';
import { GetHotelAppStatusFilterDto } from './dto/get-hotelapp.filter.dto';
import { Hotelapp } from './entities/hotelapp.entity';

@Controller('hotelapp')
export class HotelappController {
  constructor(private readonly hotelappService: HotelAppService) {}

  @Post()
  create(@Body() createHotelappDto: CreateHotelappDto) : Promise<Hotelapp> {
    return this.hotelappService.createHotelApp(createHotelappDto);
  }

  @Get()
  getHotelApp(@Query() filterDto: GetHotelAppStatusFilterDto): Promise<Hotelapp[]> {
    return this.hotelappService.getHotelApp(filterDto);
  }

  @Get(':/id')
  findOne(@Param('id') id: string): Promise <Hotelapp> {
    return this.hotelappService.getHotelAppById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelappDto: UpdateHotelappDto) {
    return this.hotelappService.updateHotelApp(id, updateHotelappDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelappService.deleteHotelApp(id);
  }
}
