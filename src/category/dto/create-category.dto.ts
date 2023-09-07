import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description:'Category Name',} )
    @IsNotEmpty({message:'genre cant not be empty.'})
    @IsString({message:'genre should be string'})
    genre:string;
}
