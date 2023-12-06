import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    return await this.prisma.categories.create({
      data: {
        ...createCategoryDto,
        restaurant_id: id,
      },
    });
  }

  async findAll(id: number) {
    return await this.prisma.categories.findMany({
      where: {
        restaurant_id: id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    restaurantId: number,
  ) {
    return await this.prisma.categories.update({
      where: {
        category_id: id,
      },
      data: {
        ...updateCategoryDto,
        restaurant_id: restaurantId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.categories.delete({
      where: {
        category_id: id,
      },
    });
  }
}
