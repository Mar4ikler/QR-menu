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
import { JwtAuthGuard } from 'src/auth/decorators/jwtGuard';
import { AuthService } from 'src/auth/auth.service';

@Controller('restaurants')
@UseGuards(JwtAuthGuard)
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
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
    const id = request.user.sub;
    return await this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
