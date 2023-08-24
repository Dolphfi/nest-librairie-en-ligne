import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthentModule } from './authent/authent.module';

@Module({
  imports: [AuthentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
