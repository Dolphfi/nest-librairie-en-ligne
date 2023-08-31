import { Module } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from './entities/livre.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([Livre]),CategoryModule],
  controllers: [LivresController],
  providers: [LivresService],
})
export class LivresModule {}
