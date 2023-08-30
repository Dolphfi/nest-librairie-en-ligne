import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:'genre cant not be empty.'})
    @IsString({message:'genre should be string'})
    genre:string;
}
