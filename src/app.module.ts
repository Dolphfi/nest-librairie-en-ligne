import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthentModule } from './authent/authent.module';
import { LivresModule } from './livres/livres.module';

@Module({
  imports: [AuthentModule, LivresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
