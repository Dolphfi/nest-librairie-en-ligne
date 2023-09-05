import { join } from "path";
import {Column,CreateDateColumn,Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,Timestamp} from "typeorm";
import { shippingEntity } from "./shipping.entity";

@Entity({name:"orders"})
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    orderAt:Timestamp;

    @Column({type:"enum",enum:OrderStatus,default:OrderStatus.PROCESSING})
    status:string;

    @Column({nullable:true})
    ShippedAt:Date;

    @Column({nullable:true})
    deliveredAt:Date;

    @ManyToOne(()=> UserEntity,(user)=>user.ordersUpdatedBy)
    updatedBy:UserEntity;

    @OneToOne (()=> ShippingEntity,(ship)=>ship.order,{cascade:true})
    @JoinColumn()
    shippingAdress:shippingEntity;

    @OneToOne (()=> OrdersProductsEntity,(op)=>op.order,{cascade:true})
    products:OrdersProductsEntity[];
  
  




}
