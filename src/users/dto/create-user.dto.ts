import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:'Le nom est obligatoire'})
    nom: string;
    @IsNotEmpty({message:'Le prénom est obligatoire'})
    prenom: string;
    @IsNotEmpty({message:'L\'email est obligatoire'})
    @IsEmail({},{message:'L\'email n\'est pas valide'})
    email: string;
    @IsNotEmpty({message:'Le nom utilisateur est obligatoire'})
    @MinLength(3,{message:'Le nom utilisateur doit faire au moins 5 caractéres'})
    username: string;
    @IsNotEmpty()
    @MinLength(8,{message:'Le mot de passe doit faire au moins 8 caractéres'})
    password: string;
    @IsNotEmpty()
    @MinLength(8,{message:'Le mot de passe doit faire au moins 8 caractéres'})
    confirm_password: string;
}
