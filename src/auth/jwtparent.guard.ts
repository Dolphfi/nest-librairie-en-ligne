import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
export class JwtParentGuard {
    constructor(protected readonly jwtService: JwtService,
                protected readonly userService:UsersService) { }
}