import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersLivres } from './entities/orders-livre.entity';
import { Order } from './entities/order.entity';
import { Shipping } from './entities/shipping.entity';
import { LivresModule } from 'src/livres/livres.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrdersLivres,Shipping]),forwardRef(()=>LivresModule)],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[OrdersService],
})
export class OrdersModule {}