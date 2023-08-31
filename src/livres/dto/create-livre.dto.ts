import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateLivreDto {
    @ApiProperty({
        description:'Titre du livre',})
    @IsNotEmpty({ message: 'Titre ne peut pas etre vide'})
    @IsString()
    titre:string;
    @IsNotEmpty({message: 'Auteur ne peut pas etre vide.'})
    @IsString()
    auteur:string;
    @IsNotEmpty({message: 'Prix ne devrait pas etre vide'})
    @IsNumber({maxDecimalPlaces:2},{message:'Prix devrait etre un numero et max decimal precission 2'})
    @IsPositive({message: 'Prix devrait etre un numero positif'})
    prix:number;
    @IsNotEmpty({message:' Stock ne devrait pas etre vide'})
    @IsNumber({},{message:'Stock devrait etre un nombre' })
    @Min(0,{message:'Stock ne peut pas etre negatif'})
    stock:number;
    @IsNotEmpty({message:'Images ne devrait pas etre vide'})
    @IsArray({message:'Images devrait etre au format tableau '})
    images:string[];
    @IsNotEmpty({message:' category ne devrait pas etre vide'})
    @IsNumber({},{message:'category id devrait etre un nombre' })
    category: number;
}
