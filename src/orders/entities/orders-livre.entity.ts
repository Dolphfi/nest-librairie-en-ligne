import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Livre } from "src/livres/entities/livre.entity";
@Entity('orders-livres')
export class OrdersLivres{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"decimal",precision:10,scale:2,default:0})
    livre_price_unit:number;
    @Column()
    livre_quantity:number;
    @ManyToOne(()=>Order,(order)=>order.livres)
    order:Order;
    @ManyToOne(()=>Livre,(liv)=>liv.livres,{cascade:true})
    livre:Livre;


}