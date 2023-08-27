import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity } from 'typeorm';

@Entity()
export class CreatePersonDto {
  @IsNotEmpty({message:'Le nom est obligatoire'})
  @ApiProperty({ description: 'Nom de la Personne' })
  nom: string;
  @IsNotEmpty({message:'Le prénom est obligatoire'})
  @ApiProperty({ description: 'Prénom de la Personne' })
  prenom: string;
  @IsNotEmpty()
  @ApiProperty({ enum: ['masculin', 'feminin', 'autres'],description:'sexe de la personne'})
  sexe: string;
  @IsNotEmpty({message:'L\'email est obligatoire'})
  @IsEmail({},{message:'L\'email n\'est pas valide'})
  @ApiProperty({description: 'email de la personne ',})
  email: string;
  @IsString()
  @ApiPropertyOptional({ description: 'telephone de la personne ',})
  telephone?: string;
  @IsNotEmpty()
  @ApiProperty({description: 'date_naissance de la personne format yyyy-mm-dd ',
    type:Date })
  date_naissance: string;
}