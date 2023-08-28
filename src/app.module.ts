import { Module } from '@nestjs/common';
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
],
  providers: [],
})
export class AppModule {}
