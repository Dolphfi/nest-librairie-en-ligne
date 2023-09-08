import { Category } from "src/category/entities/category.entity";
import { OrdersLivres } from "src/orders/entities/orders-livre.entity";
import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
@Entity('livres')
export class Livre {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    titre:string;
    @Column()
    auteur:string;
    @Column({type:'decimal',precision:10,scale:2,default:0})
    prix:number;
    @Column()
    stock:number;
    @Column('simple-array')
    images:string[];
    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updatedAt:Timestamp;
    @ManyToOne(()=>User,(user)=>user.livre)
    addedBy:User;
    @ManyToOne(()=>Category,(cat)=>cat.livre)
    category: Category;
    @OneToMany(()=>Review,(rev)=>rev.livre)
    reviews:Review[];
    @OneToMany(()=>OrdersLivres, (ol)=>ol.livre)
    livres:OrdersLivres[];

}
