import { Injectable, NotFoundException} from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { CreateHotelappDto } from "./dto/create-hotelapp.dto";
import { GetHotelAppStatusFilterDto } from "./dto/get-hotelapp.filter.dto";
import { UpdateHotelappDto } from "./dto/update-hotelapp.dto";
import { Hotelapp } from "./entities/hotelapp.entity";
import {  Star, Status } from "./hotelapp-status.enum";

@Injectable()
export class HotelAppRepository extends Repository<Hotelapp> {

    constructor(private dataSource: DataSource)

    {
        super(Hotelapp, dataSource.createEntityManager());
    }

    async createHotelApp(createHotelAppDto:CreateHotelappDto):Promise<Hotelapp>{
        const {hotelname,
        contactnumber,
        address,
        description} = createHotelAppDto;
    const hotelapp = this.create({
        hotelname, contactnumber, address, description, star: Star.dua, hotelstatus: Status.BUMN
    });

    await this.save(hotelapp);
    return hotelapp;
}
    async getHotelApp(filterDto: GetHotelAppStatusFilterDto): Promise<Hotelapp[]>{
        const { star, search } = filterDto;
        const query = this.createQueryBuilder('hotelapp');
    
    if(star){
        query.andWhere('hotel.star = star', {star});
    }

    if(search){
        query.andWhere(
            'LOWER(hotel.status) LIKE LOWER:(search) OR LOWER(hotel.hotelname) LIKE LOWER(:search)',
            { search: `%${search}%`}
        );
    }

    const tasks = await query.getMany();
    return tasks;
}
async updateTasks(id: string, updateDTO:UpdateHotelappDto): Promise<Object>{
    await this.update(id,updateDTO);
    const data = await this.getTask(id);
    return{
        status:200,
        message:"Data Has Been Updated Successfully",
        data:data
    }
    }
    async deleteTasks(id: string): Promise<Object>{
        const data = await this.getTask(id);
        if(!data){
            throw new NotFoundException('Task Not Found');
        }
        await this.delete(id);
        return{
            status:200,
            message:"Data Has Been Deleted Successfully",
            data: data
        }
    }

    getTask(id:string): Promise<Hotelapp>{
        const data = this.findOneBy({id});
        if(!data){
            throw new NotFoundException('Task Not Found')
        }
        return data;
    }



}