import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  .addTag('cats')
  // .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
