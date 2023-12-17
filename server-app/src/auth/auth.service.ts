import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload, { secret: 'mark' });
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token, { secret: 'mark' });
  }

  async checkLogin(username: string, password: string) {
    return await this.prisma.users.findFirst({
      where: {
        username: username,
        password: password,
      },
    });
  }

  async getPayloadFromToken(token: string) {
    return this.jwtService.decode(token);
  }

  // async registration(createUserDto: CreateUserDto) {
  //   return await this.prisma.users.create({
  //     data: {
  //       ...createUserDto,
  //     },
  //   });
  // }
}
