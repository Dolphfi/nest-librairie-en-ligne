import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { LivresModule } from './livres/livres.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true}),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    database: 'bibliotheque',
    username: 'root',
    password: 'Rodolph4904@',
    autoLoadEntities: true,
    synchronize: true,
  }),
  UsersModule,
  CategoryModule,
  LivresModule,
  ReviewsModule,
  OrdersModule,
],
  providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
