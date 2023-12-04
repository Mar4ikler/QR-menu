import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './all-exception.filter';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [AuthModule, UsersModule, RestaurantsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
