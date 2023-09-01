import { PartialType } from '@nestjs/swagger';
import { SignInUserDto } from './user-signin.dto';
import { SignUpUserDto } from './user-signup.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
