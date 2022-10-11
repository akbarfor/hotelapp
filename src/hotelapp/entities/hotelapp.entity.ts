import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../hotelapp-status.enum";

@Entity()
export class Hotelapp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hotelname: string;

    @Column()
    contactnumber: string;

    @Column()
    address: string;

    @Column()
    star: string;

    @Column()
    hotelstatus: string;

    @Column()
    description: string;
}
