import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";
import { SignInUserDto } from "./user-signin.dto";


export class SignUpUserDto extends SignInUserDto {
    @MaxLength(30)
    @IsString()
    @IsNotEmpty({message:'Le nom est obligatoire'})
    @ApiProperty({
        description:'nom de l\'utilisateur',})
    nom: string;
    @MaxLength(30)
    @IsString()
    @IsNotEmpty({message:'Le prénom est obligatoire'})
    @ApiProperty({
        description:'prénom de l\'utilisateur',})
    prenom: string;
    @IsNotEmpty({message:'Le nom utilisateur est obligatoire'})
    @MinLength(5,{message:'Le nom utilisateur doit faire au moins 5 caractéres'})
    @ApiProperty({
        description:'username de l\'utilisateur',})
    username: string;
    @IsNotEmpty()
    @MinLength(8,{message:'Le mot de passe doit faire au moins 8 caractéres'})
    @ApiProperty({
        description:'confirmation du mot de passe de l\'utilisateur',})
    confirm_password: string;
}
