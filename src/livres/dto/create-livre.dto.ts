import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateLivreDto {
    @ApiProperty({
        description:'Titre du livre',})
    @IsNotEmpty({ message: 'Titre ne peut pas etre vide'})
    @IsString()
    titre:string;
    @ApiProperty({
        description:'Nom de l\'auteur',})
    @IsNotEmpty({message: 'Auteur ne peut pas etre vide.'})
    @IsString()
    auteur:string;
    @ApiProperty({
        description:'Prix du livre',})
    @IsNotEmpty({message: 'Prix ne devrait pas etre vide'})
    @IsNumber({maxDecimalPlaces:2},{message:'Prix devrait etre un numero et max decimal precission 2'})
    @IsPositive({message: 'Prix devrait etre un numero positif'})
    prix:number;
    @ApiProperty({
        description:'Stock du livre',})
    @IsNotEmpty({message:' Stock ne devrait pas etre vide'})
    @IsNumber({},{message:'Stock devrait etre un nombre' })
    @Min(0,{message:'Stock ne peut pas etre negatif'})
    stock:number;
    @ApiProperty({
        description:'Image du livre',})
    @IsNotEmpty({message:'Images ne devrait pas etre vide'})
    @IsArray({message:'Images devrait etre au format tableau '})
    images:string[];
    @ApiProperty({
        description:'Genre de livre',})
    @IsNotEmpty({message:' category ne devrait pas etre vide'})
    @IsNumber({},{message:'category id devrait etre un nombre' })
    categoryId: number;
}
