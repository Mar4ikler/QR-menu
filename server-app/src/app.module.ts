import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './all-exception.filter';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { JwtService } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';
import { DishesModule } from './dishes/dishes.module';
import { IpMiddleware } from './ip.middleware';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RestaurantsModule,
    CategoriesModule,
    DishesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpMiddleware)
      .exclude(
        { path: 'api/auth/login', method: RequestMethod.ALL },
        { path: 'api/restaurants', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
