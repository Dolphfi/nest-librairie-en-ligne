import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
    @Column()
    token: string;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    expire_date: Date;
}
