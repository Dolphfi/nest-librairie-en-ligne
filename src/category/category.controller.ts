import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthentificationGuard } from 'src/utility/guards/authentification.guard';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { Category } from './entities/category.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';

@Controller('category')
@ApiTags('Genre')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Post()
  @ApiOperation({ description: 'this is the endpoint for Creating  a Category' })
  async create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser()currentUser:User)
  :Promise<Category>{
    return await this.categoryService.create(createCategoryDto,currentUser);
  } 

  @Get()
  
  @ApiOperation({
    description: 'this is the endpoint for retrieving all  category without filter',
  })
  async findAll():Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiParam({name:'id', type: 'number', description: 'id of category'})
  @ApiOperation({
    description: 'this is the endpoint for retrieving  one category',
  })
  async findOne(@Param('id') id: string) :Promise<Category>{
    return await this.categoryService.findOne(+id);
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard,AuthorizeGuard)
  @Patch(':id')
  @ApiResponse({ type: CreateCategoryDto })
  @ApiOperation({
    description: 'this is the endpoint for updating  a genre(Category Livre)',
  })
  @ApiParam({name:'id',type:'number',description:'id category'})
 async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.categoryService.update(+id, updateCategoryDto);
  }
}
