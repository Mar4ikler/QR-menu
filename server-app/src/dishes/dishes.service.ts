import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DishesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDishDto: CreateDishDto) {
    return await this.prisma.dishes.create({
      data: {
        ...createDishDto,
      },
    });
  }

  async findAll(id: number, like: string) {
    return await this.prisma.dishes.findMany({
      where: {
        category_id: id,
        dish_name: {
          contains: like,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    return await this.prisma.dishes.update({
      where: {
        dish_id: id,
      },
      data: {
        ...updateDishDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.dishes.delete({
      where: {
        dish_id: id,
      },
    });
  }
}
