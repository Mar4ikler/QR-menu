import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: number, createRestaurantDto: CreateRestaurantDto) {
    return await this.prisma.restaurants.create({
      data: {
        ...createRestaurantDto,
        restaurant_id: id,
      },
    });
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  async findOne(id: number) {
    return await this.prisma.restaurants.findUnique({
      where: {
        restaurant_id: id,
      },
    });
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
