import {Column,CreateDateColumn,Entity,Generated,PrimaryGeneratedColumn,UpdateDateColumn} from 'typeorm';

export enum Sexe {
  MASCULIN = 'masculin',
  FEMININ = 'feminin',
  AUTRES = 'autres',
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  @Generated("uuid")
  uuid: string;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  prenom: string;

  @Column({ type: 'enum', enum: Sexe, default: Sexe.MASCULIN })
  sexe: string;

  @Column({ length: 255, unique: true, nullable: true })
  email: string;

  @Column({ length: 255, unique: true, nullable: true })
  telephone?: string;

  @Column("date")
  date_naissance: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
