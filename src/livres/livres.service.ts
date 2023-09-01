import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { Livre } from './entities/livre.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class LivresService {
  constructor(@InjectRepository(Livre)
  private readonly livreRepository:Repository<Livre>,
  private readonly categoryService: CategoryService){}
  
  async create(createLivreDto: CreateLivreDto,currentUser:User,
    ): Promise<Livre> {
  const category = await this.categoryService.findOne(
  +createLivreDto.categoryId);
  const livre = this.livreRepository.create(createLivreDto);
  const livreExist = await this.livreRepository.findOne({where: {titre: livre.titre}});
  if(livreExist) throw new NotFoundException('Livre already exist');
  livre.category  = category;
  livre.addedBy = currentUser;

  return await this.livreRepository.save(livre)
  }

  async findAll():Promise<Livre[]> {
    return this.livreRepository.find();
  }

  async findOne(id: number) {
    const livre= await this.livreRepository.findOne({
      where:{ id : id },
      relations:{
        addedBy:true,
        category:true,
      },
      select:{
        addedBy:{
          id:true,
          nom:true,
          prenom:true,
          email:true,
          roles:true,
        },
        category:{
          id:true,
          genre:true,
        },
      }
    });
    if (!livre) throw new NotFoundException('Livre not found.');
    return livre;
  }

  async update(id: number, updateLivreDto:Partial<UpdateLivreDto>,currentUser:User,):Promise<Livre> {
    const livre=await this.findOne(id);
    Object.assign(livre,updateLivreDto)
    livre.addedBy=currentUser;
    if(updateLivreDto.categoryId){
      const category = await this.categoryService.findOne(
      +updateLivreDto.categoryId);
      livre.category  = category;
    }

    return await this.livreRepository.save(livre);
  }

  async remove(id: number) {
    const livreExist = await this.livreRepository.findOne({where: {id}});
    if (!livreExist) throw new NotFoundException(`Livre with ${id} not found.`);
    return await this.livreRepository.delete(id);
  }
}
