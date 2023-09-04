import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message:'Livre should not be emtpty'})
    @IsNumber({},{message:'Livre Id should be number'})
    livreId:number;
    @IsNotEmpty({message:'reting could be empty'})
    @IsNumber()
    rating:number;
    @IsNotEmpty({message:'comment should be not empty'})
    comment:string;

}
