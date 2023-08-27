import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PersonsModule } from 'src/persons/persons.module';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token_service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[ConfigModule.forRoot({ isGlobal: true}), TypeOrmModule.forFeature([TokenEntity]),PassportModule, JwtModule.register({
   secret: process.env.JWT_SECRET, 
  }), PersonsModule,UsersModule],
  controllers: [AuthController],
  providers: [AuthService,TokenService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
