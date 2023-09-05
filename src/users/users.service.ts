import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
    private usersRepository: Repository<User>,
  ){}

  async create(SignUpUserDto: SignUpUserDto): Promise<User> {
    const userExists = await this.findUserByEmail(SignUpUserDto.email)
    if (userExists) throw new BadRequestException('Email is Already available')
    if(SignUpUserDto.password != SignUpUserDto.confirm_password){
      throw new BadRequestException('Confirm Passwords do not match')
    }
    const usernameUser = await this.usersRepository.findOne({where:{username:SignUpUserDto.username}})
    if (usernameUser) {
      throw new BadRequestException('Username is Already available')
    }
    delete SignUpUserDto.confirm_password;
    const salt = await bcrypt.genSalt()
    SignUpUserDto.password = await bcrypt.hash(SignUpUserDto.password, salt)
    let user = this.usersRepository.create(SignUpUserDto);
    user = await this.usersRepository.save(user);
    return user;
    }

  async signin(signInUserDto: SignInUserDto): Promise<User> {
    const userExists = await this.usersRepository.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email',{email:signInUserDto.email})
    .getOne();
    if (!userExists) throw new BadRequestException('Invalid email')
    const passwordIsValid = await bcrypt.compare(signInUserDto.password,userExists.password);
    if (!passwordIsValid) throw new BadRequestException('Invalid Password');
    delete userExists.password;
    return userExists;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where:{id:id}});
    if(!user) throw new NotFoundException('User not found')
    return user;
  }

  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email})
  }

  async token_access(userEn:User): Promise<string>{
    return sign({id:userEn.id,email:userEn.email},process.env.TOKEN_ACCESS_SECRET_KEY,
    {expiresIn:'30d'})
  }

  async update(updateUserDto: UpdateUserDto, currentUser:User,): Promise<User> {
    const user = await this.findOne(currentUser.id);
    Object.assign(user,updateUserDto)
    return await this.usersRepository.save(user);
  }

}
