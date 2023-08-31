import { Module } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from './entities/livre.entity';
<<<<<<< HEAD
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([Livre]),CategoryModule],
=======

@Module({
  imports:[TypeOrmModule.forFeature([Livre])],
>>>>>>> 18dd3c2ae4bb168f1c6dee1cb177ba0210201750
  controllers: [LivresController],
  providers: [LivresService],
})
export class LivresModule {}
