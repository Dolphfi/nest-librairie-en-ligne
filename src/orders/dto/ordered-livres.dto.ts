import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class OrderedLivresDto{
    @ApiProperty({
        description: "id of the ordered livre",})
    @IsNotEmpty({message: "livre is required"})
    id: number;
    @ApiProperty({
        description: "price of the ordered livre",})
    @IsNumber({maxDecimalPlaces: 2},{message: "livre price should be number & max decimal precision 2"})
    @IsPositive({message: "livre price should be positive"})
    livre_price_unit:number;
    @ApiProperty({
        description: "quantity of the ordered livre",})
    @IsNumber({},{message: "livre quantity should be number"})
    @IsPositive({message: "livre quantity should be positive"})
    livre_quantity:number;
}