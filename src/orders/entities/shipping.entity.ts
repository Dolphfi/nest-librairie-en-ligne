import { Entity, PrimaryGeneratedColumn,Column, OneToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity('shipping')
export class Shipping{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    phone:string;
    @Column({default:''})
    nomPrenom:string;
    @Column()
    adress:string;
    @Column()
    city:string;
    @Column()
    postCode:string;
    @Column()
    state:string;
    @Column()
    country:string;
    @OneToOne(()=>Order,(order)=>order.shippingAddress)
    order:Order;
     






}