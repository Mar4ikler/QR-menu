import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './all-exception.filter';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { JwtService } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [AuthModule, UsersModule, RestaurantsModule, CategoriesModule, DishesModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtService,
  ],
})
export class AppModule {}
