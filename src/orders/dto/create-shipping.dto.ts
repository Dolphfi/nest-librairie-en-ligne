import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShippingDto {
    @ApiProperty({
        description:'Phone number of the customer',})
    @IsNotEmpty({ message: 'Phone number is required'})
    @IsString({ message: 'Phone number must be a string'})
    phone:string;
    @ApiProperty({
        description:'Firstname and Lastname of the customer',})
    @IsOptional({message:'Firstname and Lastname are optional'})
    @IsString({ message: 'Firstname and Lastname must be a string'})
    nomPrenom:string;
    @ApiProperty({
        description:'Adress of the customer',})
    @IsNotEmpty({ message: 'Adress is required'})
    @IsString({ message: 'Adress must be a string'})
    adress:string;
    @ApiProperty({
        description:'City of the customer',})
    @IsNotEmpty({ message: 'City is required'})
    @IsString({ message: 'City must be a string'})
    city:string;
    @ApiProperty({
        description:'Post code of the customer',})
    @IsNotEmpty({ message: 'Post code is required'})
    @IsString({ message: 'Post code must be a string'})
    postCode:string;
    @ApiProperty({
        description:'State of the customer',})
    @IsNotEmpty({ message: 'State is required'})
    @IsString({ message: 'State must be a string'})
    state:string;
    @ApiProperty({
        description:'Country of the customer',})
    @IsNotEmpty({ message: 'Country is required'})
    @IsString({ message: 'Country must be a string'})
    country:string;
}