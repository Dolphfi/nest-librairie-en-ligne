import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,Timestamp} from "typeorm";
import { Shipping } from "./shipping.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { User } from "src/users/entities/user.entity";
import { OrdersLivres } from "./orders-livre.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn()
    orderAt:Timestamp;
    @Column({type:"enum",enum:OrderStatus, default:OrderStatus.PENDING})
    status:string;
    @Column({nullable:true})
    ShippedAt:Date;
    @Column({nullable:true})
    deliveredAt:Date;
    @ManyToOne(()=> User,(user)=>user.ordersUpdateBy)
    updatedBy:User;
    @OneToOne (()=> Shipping,(ship)=>ship.order,{cascade:true})
    @JoinColumn()
    shippingAddress:Shipping;
    @OneToMany (()=> OrdersLivres,(ol)=>ol.order,{cascade:true})
    livres:OrdersLivres[]; 
    @ManyToOne(()=> User,(user)=>user.orders)
    user:User;
  




}
