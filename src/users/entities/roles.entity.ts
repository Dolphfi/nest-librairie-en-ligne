import { User } from './user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    role_name: string;
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=>User, user=>user.role)
    user: User;
}