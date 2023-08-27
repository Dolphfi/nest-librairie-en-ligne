import {  IsNotEmpty } from "class-validator";

export class UpdateUserRoleDto {
 
    @IsNotEmpty()
    role_name: string;
}
