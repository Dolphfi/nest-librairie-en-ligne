import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from './dto/user-signup.dto';
import { User } from './entities/user.entity';
import { SignInUserDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController { constructor(private readonly usersService: UsersService) {}

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
  
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Get() 
  @ApiResponse({type: SignUpUserDto, isArray: true})
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Get(':id')
  @ApiResponse({type: SignUpUserDto, isArray:false})
  @ApiParam({name: 'id', type: 'number', description: 'id of user'})
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }
  
  @UseGuards(AuthentificationGuard)
  @Get('me')
  @ApiResponse({type: SignUpUserDto, isArray:false}
  )
  async viewProfile(@CurrentUser() currentUser:User): Promise<User> {
    return await this.usersService.findOne(currentUser.id);
    }

@UseGuards(AuthentificationGuard)
@Patch('me')
async update( @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser:User,):Promise<User> {
    const user = currentUser;
    return await this.usersService.update(updateUserDto, currentUser);
  }
}
