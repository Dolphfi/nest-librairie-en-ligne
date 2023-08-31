import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
import { ApiTags } from '@nestjs/swagger';

@Controller('livres')
@ApiTags('Livres')
export class LivresController {
  constructor(private readonly livresService: LivresService) {}

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Post()
  async create(@Body() createLivreDto: CreateLivreDto, 
  @CurrentUser() currentUser:User,
  ): Promise<Livre> {
    return await this.livresService.create(createLivreDto, currentUser);
  }

  @Get()
  async findAll():Promise <Livre[]> {
    return await this.livresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.livresService.findOne(+id);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLivreDto: UpdateLivreDto,@CurrentUser()
  CurrentUser:User) {
    return await this.livresService.update(+id, updateLivreDto,CurrentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livresService.remove(+id);
  }
}
