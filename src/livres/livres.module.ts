import { Module, forwardRef } from '@nestjs/common';
import { LivresService } from './livres.service';
import { LivresController } from './livres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from './entities/livre.entity';
import { CategoryModule } from 'src/category/category.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports:[TypeOrmModule.forFeature([Livre]),CategoryModule,forwardRef(()=>OrdersModule)],
  controllers: [LivresController],
  providers: [LivresService],
  exports:[LivresService],
})
export class LivresModule {}
