import { Module } from '@nestjs/common';
import { AuthentService } from './authent.service';
import { AuthentController } from './authent.controller';

@Module({
  controllers: [AuthentController],
  providers: [AuthentService],
})
export class AuthentModule {}
