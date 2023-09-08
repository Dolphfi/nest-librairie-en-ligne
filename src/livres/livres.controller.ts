import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { LivresService } from './livres.service';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { Livre } from './entities/livre.entity';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializeIncludes, SerializeInterceptor } from 'src/utility/interceptors/serialize.interceptor';
import { LivresDto } from './dto/livres.dto';

@Controller('livres')
@ApiTags('Livres')
export class LivresController {
  constructor(private readonly livresService: LivresService) {}

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Post()
  @ApiOperation({ description: 'this is the endpoint for Creating  a book' })
  async create(@Body() createLivreDto: CreateLivreDto, 
  @CurrentUser() currentUser:User,
  ): Promise<Livre> {
    return await this.livresService.create(createLivreDto, currentUser);
  }
  @SerializeIncludes(LivresDto)
  @Get()
  @ApiOperation({
    description: 'this is the endpoint for retrieving all  Book',
  })
  @ApiResponse({type:Livre, isArray:true})
  async findAll(@Query() query:any): Promise<LivresDto> {
    return await this.livresService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    description: 'this is the endpoint for retrieving  one book',
  })
  @ApiParam({name:'id',type:'number',description:'id du livre'})
  @ApiResponse({type:Livre, isArray:false})
  async findOne(@Param('id',ParseIntPipe) id: string) {
    return await this.livresService.findOne(+id);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Patch(':id')
  @ApiOperation({
    description: 'this is the endpoint for updating  a book',
  })
  @ApiParam({name:'id',type:'number',description:'id du livre'})
  async update(@Param('id',ParseIntPipe) id: string, @Body() updateLivreDto: UpdateLivreDto,@CurrentUser()
  currentUser:User,):Promise<Livre> {
    return await this.livresService.update(+id, updateLivreDto,currentUser);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Delete(':id')
  @ApiOperation({
    description: 'this is the endpoint for deleting  a book',
  })
  @ApiParam({name:'id',type:'number',description:'id du livre'})
  async remove(@Param('id',ParseIntPipe) id: string) {
    return await this.livresService.remove(+id);
  }
}
