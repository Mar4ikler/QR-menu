import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService],
})
export class RestaurantsModule {}
