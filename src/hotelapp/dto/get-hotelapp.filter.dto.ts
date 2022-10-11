import { IsOptional, IsEnum, IsString } from "class-validator";
import { Star } from "../hotelapp-status.enum";

export class GetHotelAppStatusFilterDto{

    @IsOptional()
    @IsEnum(Star)
    star : Star;

    @IsOptional()
    @IsString()
    search? : string;


}