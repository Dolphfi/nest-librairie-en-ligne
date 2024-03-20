import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

declare global{
    namespace Express{
        interface Request{
            currentUser?: User;
        }
    }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService){}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
        req.currentUser=null;
        next();
        return;
    }else{
        try{
        const token = authHeader.split(' ')[1];
        const {id}= <JwtPayload> verify(token,process.env.TOKEN_ACCESS_SECRET_KEY);
        const currentUser = await this.usersService.findOne(+id)
        req.currentUser = currentUser;
        next();
        }catch(error){
            req.currentUser=null;
            next();
        }
        
    }
  }
}
interface JwtPayload{
    id:string;
}
