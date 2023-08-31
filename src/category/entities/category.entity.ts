import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    genre:string;
    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updatedAt:Timestamp;
    @ManyToOne(()=>User,(user)=>user.category)
    addedBy:User;
}
