import { type } from "os";
import { use } from "passport";
import { Livre } from "src/livres/entities/livre.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('Review')

export class Review {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    rating:number;
    @Column()
    comment:string;
    @CreateDateColumn()
    createAt:Timestamp;
    @UpdateDateColumn() 
    updateAt: Timestamp;
    @ManyToOne(type=>User,(User)=>User.Review)
    User:User;
    @ManyToOne(type=>Livre,(livre)=>livre.Review)
    livre:Livre;
}
