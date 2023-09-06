import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../enums/order-status.enum";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateOrderStatusDto{
    @ApiProperty({
        description:'Status of the order',})
    @IsNotEmpty({ message: 'Status is required'})
    @IsString({ message: 'Status must be a string'})
    @IsIn([OrderStatus.SHIPPED,OrderStatus.DELIVERED])
    status:OrderStatus;
}