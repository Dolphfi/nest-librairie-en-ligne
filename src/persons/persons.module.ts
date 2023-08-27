import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
