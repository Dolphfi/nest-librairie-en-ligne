import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('livres')
export class Livre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    titre: string;

    @Column({ nullable: false })
    auteur: string;

    @Column({ nullable: false })
    genre: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    prix: number;

    @Column({ nullable: false })
    imagePath: string; 

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
