import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt';
import { SignInUserDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
    private usersRepository: Repository<User>,
  ){}

  async create(SignUpUserDto: SignUpUserDto): Promise<User> {
    const userExists = await this.findUserByEmail(SignUpUserDto.email)
    if (userExists) throw new BadRequestException('Email is not available')
    SignUpUserDto.password = await hash(SignUpUserDto.password,10)
    let user = this.usersRepository.create(SignUpUserDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
    }

  async signin(signInUserDto: SignInUserDto): Promise<User> {
    const userExists = await this.usersRepository.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email',{email:signInUserDto.email})
    .getOne();
    if (!userExists) throw new BadRequestException('Invalid credentials')
    const passwordIsValid = await compare(signInUserDto.password,userExists.password);
    if (!passwordIsValid) throw new BadRequestException('Invalid credentials');
    delete userExists.password;
    return userExists;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});
    if(!user) throw new NotFoundException('User not found')
    return user;
  }
  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email})
  }

  async token_access(userEn:User): Promise<string>{
    return sign({id:userEn.id,email:userEn.email},'ceciestmoncodesecret',
    {expiresIn:'7d'})
  }
}
