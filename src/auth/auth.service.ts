import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PersonsService } from 'src/persons/persons.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token_service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Response,Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly personService: PersonsService,
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
  private readonly tokenService: TokenService){}

  async validateUser(username:string,password:string):Promise<User> {
    const user = await this.usersService.findOneUserByUsername(username)
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return null;
    }
    return user;
  }

  async login(user: any){
    const payload = {username: user.username, sub: user.id};
    const refreshToken = await this.jwtService.signAsync(payload,{expiresIn:'7d'});
    const access_token = await this.jwtService.signAsync(payload,{expiresIn:'7d'})
    
    let expire_date = new Date();
    expire_date.setDate(expire_date.getDate() + 7);
    expire_date.setDate(expire_date.getDate() + 7);

    await this.tokenService.saveToken({
      user_id: user.id,
      token: refreshToken,
      expire_date,
    });
    
    return {
      access_token
    }
  }

  async user(user: any){
    const savedUser = await this.usersService.findOneById(user.id);
    if(savedUser){
      return savedUser;
    }else{
      throw new NotFoundException('User not found')
    }
  }

  async refresh(req: Request, res: Response){
    const refresh_token = req.cookies['refresh_token'];
    if (!refresh_token) {
      return
    }

    try {
      const {id} = await this.jwtService.verify(refresh_token);
      const tokenEntity = await this.tokenService.findOneTOken(id);
      
      if (!tokenEntity) {
        throw new  HttpException('Not authorized Request',401);
      }
      const access_token = await this.jwtService.signAsync(
        { id },
        { expiresIn: '30s' },
      );
      return `${access_token}`;
    } catch (error) {
      throw new HttpException('Not authorized Request',401);
    }
  }

  async logout(req: Request, res: Response) {
    const refresh_token = req.cookies['refresh_token'];
    this.tokenService.deleteToken(refresh_token);
    res.clearCookie('refresh_token');
  }
}
