import { Controller, Get, Post, Body, Patch, Param, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
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
export class UsersController { 
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ description: 'this is the endpoint for Creating  a user' })
  async create(@Body() signUpUserDto: SignUpUserDto): Promise<{user: User}> {
    return {user: await this.usersService.create(signUpUserDto)};
  }

  @Post('signin')
  @ApiOperation({ description: 'this is the endpoint for connect  a user' })
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<{
    token_access: string; user: User;}>{
    const user = await this.usersService.signin(signInUserDto);
    const token_access = await this.usersService.token_access(user);

    return {token_access, user};
  }
  
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Get() 
  @ApiOperation({
    description: 'this is the endpoint for retrieving all  users without filter',
  })
  @ApiResponse({type: SignUpUserDto, isArray: true})
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Get(':id')
  @ApiOperation({
    description: 'this is the endpoint for retrieving  one user',
  })
  @ApiResponse({type: SignUpUserDto, isArray:false})
  @ApiParam({name: 'id', type: 'number', description: 'id of user'})
  async findOne(@Param('id',ParseIntPipe) id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }
  
  @UseGuards(AuthentificationGuard)
  @Get('me/profile')
  @ApiOperation({
    description: 'this is the endpoint for retrieving  active user profile',
  })
  @ApiResponse({type: SignUpUserDto, isArray:false}
  )
  async viewProfile(@CurrentUser() currentUser:User): Promise<User> {
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.findOne(currentUser.id);
  }

@UseGuards(AuthentificationGuard)
@Patch()
@ApiOperation({
  description: 'this is the endpoint for updating  active user profile',
})
@ApiParam({name:'id',type:'number',description:'Active user'})
async update( @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser:User,):Promise<User> {
    const user = currentUser;
    return await this.usersService.update(updateUserDto, currentUser);
  }
}
