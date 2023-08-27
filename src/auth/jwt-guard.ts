import { Reflector } from '@nestjs/core';

import {  ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
   constructor(private readonly reflector: Reflector) {
      super()
   }
  canActivate(context: ExecutionContext) {
      const isPublic= this.reflector.get<boolean>(IS_PUBLIC_KEY, 
         context.getHandler()
       );
      const request = context.switchToHttp().getRequest()
      console.log(isPublic);
      
      if (isPublic) {
         return true;
      }
      // Add your custom authentication logic here
      // for example, call super.logIn(request) to establish a session.
      return super.canActivate(context);
   }
   

    
}