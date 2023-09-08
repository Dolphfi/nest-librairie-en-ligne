import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmFilter } from './exceptions/typeorm.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  app.useGlobalFilters(new TypeOrmFilter());
  const config = new DocumentBuilder()
  .setTitle('Api for the backend Library')
  .setDescription(`
    this api is designed for the backend Library 
    CREATED RESSOURCE: 201
    RETRIEVE RESOURCE: 200
    NOT FOUND RESOURCE:404
    BAD REQUEST :      400
    FORBIDEN RESOURCE :401
    `)
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
