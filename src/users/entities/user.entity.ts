import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./roles.entity";
import { Person } from "src/persons/entities/person.entity";

@Entity('users')
export class User {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true, nullable: false })
    username: string;
    @Column({ nullable: false })
    password: string;
    @Column({nullable: false, default: 1 })
    isActive: boolean;
    @Column()
    personId: number;
    @ManyToOne(() => Roles, (roles) => roles.user, { cascade: true })
    @JoinColumn()
    role: Roles;
    @OneToOne(() => Person)
    @JoinColumn()
    person: Person;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
