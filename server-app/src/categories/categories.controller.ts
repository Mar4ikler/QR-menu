import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() request,
  ) {
    return await this.categoriesService.create(
      createCategoryDto,
      +request.restaurant_id,
    );
  }

  @Get()
  async findAll(@Request() request) {
    const id = request.restaurant_id;
    return await this.categoriesService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() request,
  ) {
    return await this.categoriesService.update(
      +id,
      updateCategoryDto,
      +request.restaurant_id,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(+id);
  }
}
