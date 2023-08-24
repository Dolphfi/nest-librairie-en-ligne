import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthentModule } from './authent/authent.module';
import { LivresModule } from './livres/livres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    database: 'bibliotheque',
    username: 'root',
    password: 'Rodolph4904@',
    autoLoadEntities: true,
    synchronize: true,
  }),
  AuthentModule, 
  LivresModule
],
  providers: [AppService],
})
export class AppModule {}
