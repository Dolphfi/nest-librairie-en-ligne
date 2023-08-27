import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from './entities/roles.entity';
import { PersonsService } from 'src/persons/persons.service';
import { AbstracService } from 'src/commons/abstract.service';
import { UpdateUserRoleDto } from './dto/update-user.role.dto';
//import * as faker from 'faker';

@Injectable()
export class UsersService extends AbstracService {
  constructor(
    private personService: PersonsService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Roles) private roleRepo: Repository<Roles>,
  ) {
    super(userRepo);
  }

  //createRandomUser(): CreateUserDto{
    //return {
      //email: 'rodolphfidele@gmail.com',
      //username: faker.name.middleName('female'),
      //password: 'Rodolph4904@',
      //confirm_password: 'Rodolph4904',
      //role_name: 'ADMIN',
    //};
  //}

  async create(createUserDto: CreateUserDto) {
    const person = await this.personService.findOnePersonByEmail(createUserDto.email)
    if (!person) {
      throw new BadRequestException('Email not authorized')
    }

    const personIdsaved = await this.userRepo.findOne({where: {personId: person.id}})
    const usernamesaved = await this.userRepo.findOne({where: {username: createUserDto.username}})

    if (personIdsaved || usernamesaved) {
      throw new BadRequestException('username or user already exist')
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const rolesaved = await this.roleRepo.findOne({where: {role_name:createUserDto.role_name}})
    const user = this.userRepo.create(createUserDto)
    user.password = hash;
    user.person = person;
    if (!rolesaved) {
      const role = new Roles()
      role.role_name = createUserDto.role_name;
      this.roleRepo
      user.role = role;

      return await this.userRepo.save(user)
    }
    user.role = rolesaved;

    return await this.userRepo.save(user)
  }

  async findOneById(id:number){
    return await this.userRepo.findOne({where:{id},relations:['person','role']})
  }

  async findOneUser(uuid: string, relations: any[] = []){
    const person = await this.personService.findOne(uuid);
    return super.findOne({personId: person.id}, relations);
  }

  async  findOneUserByUsername(username:string) {
    return await this.userRepo.findOne({where:{username},relations:['person','role']})
  }

  async updateRoleClient(uuid: string, UpdateUserRoleDto: UpdateUserRoleDto){
    const oneUser = await this.findOneUser(uuid);
    const id = oneUser.id;
    const rolesaved = await this.roleRepo.findOne({ where: { role_name: UpdateUserRoleDto.role_name } })
    if (!rolesaved) {
      throw new BadRequestException('role does not exist')
    }
    await this.userRepo.update(id, { role:rolesaved});
   
    return await this.userRepo.findOne({
      where: { id },
      relations: ['person','role'],
    });
  }

  async removeOneUser(uuid: string) {
    const client = await this.findOneUser(uuid, ['person']);
    const delUser = await this.userRepo.remove(client);
    if (delUser) {
      await this.personService.remove(client.person.uuid);
      return client;
    }
  }
}
