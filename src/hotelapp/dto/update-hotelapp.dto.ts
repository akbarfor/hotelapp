import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelappDto } from './create-hotelapp.dto';

export class UpdateHotelappDto extends PartialType(CreateHotelappDto) {}