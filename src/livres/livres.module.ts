import { Module } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from './entities/livre.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Livre])],
  controllers: [LivresController],
  providers: [LivresService],
})
export class LivresModule {}
