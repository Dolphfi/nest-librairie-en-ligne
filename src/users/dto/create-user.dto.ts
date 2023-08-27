import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:'L\'email est obligatoire'})
    @IsEmail({},{message:'L\'email n\'est pas valide'})
    email: string;
    @IsNotEmpty({message:'username utilisateur est obligatoire'})
    @MinLength(3,{message:'username utilisateur doit faire au moins 5 caractéres'})
    @ApiProperty({ description: 'username utilisateur' })
    username: string;
    @IsNotEmpty()
    @MinLength(8,{message:'Le mot de passe doit faire au moins 8 caracteres'})
    @ApiProperty({ description: 'mot de passe utilisateur' })
    password: string;
    @IsNotEmpty()
    @MinLength(8,{message:'Le mot de passe doit faire au moins 8 caractéres'})
    @ApiProperty({ description: 'confirmation mot de passe utilisateur' })
    confirm_password: string;
    @IsNotEmpty()
    @ApiProperty({ description: 'le role sur le systeme utilisateur' })
    role_name: string;
}
