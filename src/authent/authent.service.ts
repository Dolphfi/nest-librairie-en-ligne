import { Injectable } from '@nestjs/common';
import { CreateAuthentDto } from './dto/create-authent.dto';
import { UpdateAuthentDto } from './dto/update-authent.dto';

@Injectable()
export class AuthentService {
  create(createAuthentDto: CreateAuthentDto) {
    return 'This action adds a new authent';
  }

  findAll() {
    return `This action returns all authent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authent`;
  }

  update(id: number, updateAuthentDto: UpdateAuthentDto) {
    return `This action updates a #${id} authent`;
  }

  remove(id: number) {
    return `This action removes a #${id} authent`;
  }
}
