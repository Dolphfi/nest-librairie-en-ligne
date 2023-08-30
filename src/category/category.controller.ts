import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { promises } from 'dns';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
@UseGuards(AuthentificationGuard,AuthGuard([UserRole.Admin]))
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser()currentUser:User)
  :Promise<Category>{
    return await this.categoryService.create(createCategoryDto,currentUser);
  } 

  @Get()
  async findAll():Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) :Promise<Category>{
    return await this.categoryService.findOne(+id);
  }

  @UseGuards(AuthentificationGuard,AuthGuard([UserRole.Admin]))
  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto)
 :Promise<Category> {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
