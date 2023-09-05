import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
@Entity({name:"orders-products"})
exportclass OrderProductsEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"decimal",precision:10,scale:2,default:0})
    product_unit_price:number;

    @Column()
    product_quantity:number;

    @ManyToMany(()=>OrderEntity,(order)=>order.products,{cascade:true})
    product:ProductEntity;
}