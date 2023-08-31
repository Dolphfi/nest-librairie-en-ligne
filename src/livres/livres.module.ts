import { Module } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';

@Module({
  controllers: [LivresController],
  providers: [LivresService],
})
export class LivresModule {}
