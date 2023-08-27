import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
 import { LivresModule } from './livres/livres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';

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
  LivresModule,
  UsersModule,
  AuthModule,
  GenreModule,
],
  providers: [],
})
export class AppModule {}
