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
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Request() request,
  ) {
    return await this.restaurantsService.create(
      +request.user.sub,
      createRestaurantDto,
    );
  }

  // @Get()
  // findAll() {
  //   return this.restaurantsService.findAll();
  // }

  @Get()
  async findOne(@Request() request) {
    const id = request.restaurant_id;
    return await this.restaurantsService.findOne(+id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Request() request,
  ) {
    const id = request.restaurant_id;
    return await this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
