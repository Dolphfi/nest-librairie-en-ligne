import { Type } from "class-transformer";
import { CreateShippingDto } from "./create-shipping.dto";
import { Validate, ValidateNested } from "class-validator";
import { OrderedLivresDto } from "./ordered-livres.dto";

export class CreateOrderDto {
    @Type(()=>CreateShippingDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto;
    @Type(()=>OrderedLivresDto)
    @ValidateNested()
    orderedLivres: OrderedLivresDto[];

}
