import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createDishDto: CreateDishDto) {
    return await this.dishesService.create(createDishDto);
  }

  @Get(':id')
  async findAll(@Param('id') id: string, @Query('like') like: string) {
    return await this.dishesService.findAll(+id, like);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dishesService.findOne(+id);
  // }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return await this.dishesService.update(+id, updateDishDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.dishesService.remove(+id);
  }
}
