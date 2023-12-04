import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'mark',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [AuthService, PrismaService, JwtService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
