import {IsNotEmpty} from "class-validator";

export class CreateHotelappDto {

    @IsNotEmpty()
    hotelname: string;

    @IsNotEmpty()
    contactnumber: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    description;


}
