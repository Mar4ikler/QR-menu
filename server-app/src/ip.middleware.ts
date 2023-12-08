import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from './prisma.service';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip.split(':')[3].split('.').slice(0, 3).join('.');
    const restaurantId = await this.prisma.restaurants.findFirst({
      where: {
        ip: {
          contains: ip,
        },
      },
      select: {
        restaurant_id: true,
      },
    });
    if (!restaurantId)
      throw new NotFoundException('Restaurant with this ip not found');
    req['restaurant_id'] = restaurantId.restaurant_id;
    next();
  }
}
