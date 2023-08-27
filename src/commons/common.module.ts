import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/auth/jwt-guard';

@Module({ providers: [{provide:APP_GUARD,useClass:JwtGuard}]})
export class CommonModule {}
