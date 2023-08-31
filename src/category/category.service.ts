import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CurrentUser } from 'src/utility/decorators/current-users.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)private readonly categoryRepository:Repository<Category>){}
  async create(createCategoryDto: CreateCategoryDto,currentUser:User):Promise<Category> {
    const category=this.categoryRepository.create(createCategoryDto);
   category.addedBy=currentUser;
   return await this.categoryRepository.save(category);
    //return 'This action adds a new category';
  }

  async findAll() :Promise<Category[]>{
    return await this.categoryRepository.find();
  }

  async findOne(id: number) :Promise<Category>{
    return await  this.categoryRepository.findOne(
      {
        where:{id:id},
        relations:{addedBy:true},
        select:{
          addedBy:{
          id:true,
          nom:true,
          prenom:true,
          email:true,
        }
      }
      }
    );
  }

 async update(id: number, fields:Partial< UpdateCategoryDto>):Promise<Category>{
  const category=await this.findOne(id);
  if(!category) throw new NotFoundException('Category not found.');
  Object.assign(category,fields);
    return await this.categoryRepository.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
