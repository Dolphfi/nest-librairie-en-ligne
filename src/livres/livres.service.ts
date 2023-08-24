import { Injectable } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';

@Injectable()
export class LivresService {
  create(createLivreDto: CreateLivreDto) {
    return 'This action adds a new livre';
  }

  findAll() {
    return `This action returns all livres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} livre`;
  }

  update(id: number, updateLivreDto: UpdateLivreDto) {
    return `This action updates a #${id} livre`;
  }

  remove(id: number) {
    return `This action removes a #${id} livre`;
  }
}
