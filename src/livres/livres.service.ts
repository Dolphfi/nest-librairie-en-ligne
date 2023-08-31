import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { Livre } from './entities/livre.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LivresService {
  create(createLivreDto: CreateLivreDto) {
    return 'This action adds a new livre';
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

  async update(id: number, updateLivreDto:Partial<UpdateLivreDto>,currentUser:User) {
    const livre=await this.findOne(id);
    Object.assign(livre,updateLivreDto)
    livre.addedBy=currentUser;
    if(updateLivreDto.category)

    return `This action updates a #${id} livre`;
  }

  remove(id: number) {
    return `This action removes a #${id} livre`;
  }
}
