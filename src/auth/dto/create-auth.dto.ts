import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'username utilisateur' })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'mot de passe utilisateur' })
    password: string;
}
