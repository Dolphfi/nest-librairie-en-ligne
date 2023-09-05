import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity({name:"shipping"})
export class shippingEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    phone:string;

    @Column({default:''})
    name:string;

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

    @OneToOne(()=>OrderEntity,(order)=>order.shippingAdress)
    order:OrderEntity;
     






}