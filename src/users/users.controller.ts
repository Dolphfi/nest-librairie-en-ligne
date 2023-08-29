import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/user-signup.dto';
import { User } from './entities/user.entity';
import { SignInUserDto } from './dto/user-signin.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() signUpUserDto: SignUpUserDto): Promise<{user: User}> {
    return {user: await this.usersService.create(signUpUserDto)};
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<{
    token_access: string;
    user: User;}>{
    const user = await this.usersService.signin(signInUserDto);
    const token_access = await this.usersService.token_access(user);

    return {token_access, user};
  }

  @Get('all') 
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
