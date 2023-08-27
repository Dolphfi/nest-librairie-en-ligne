import { NotFoundException } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    try {
      return await this.personRepo.save(createPersonDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOnePersonByEmail(email: string) {
    return await this.personRepo.findOne({ where: { email } });
  }

  async findOne(uuid: string) {
    const person = await this.personRepo.findOne({ where: { uuid } });
    if (!person) {
      throw new NotFoundException(`person with id ${uuid} does not found`);
    }
    return person;
  }

  async update(uuid: string, updatePersonDto: UpdatePersonDto) {
    const onePerson = await this.findOne(uuid);
    if (!onePerson) {
      throw new NotFoundException(`person with id ${uuid} does not found`);
    }
    const id = onePerson.id;
    const person = await this.personRepo.preload({ id, ...updatePersonDto });
    return await this.personRepo.save(person);
  }

  async remove(uuid: string) {
    const person = await this.findOne(uuid);
    await this.personRepo.remove(person);
  }
}
