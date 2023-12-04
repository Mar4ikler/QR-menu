import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.authService.checkLogin(
      credentials.username,
      credentials.password,
    );

    if (user) {
      try {
        const token = this.authService.generateToken({
          sub: user.user_id,
          username: user.username,
        });
        return { token: token, id: user.user_id };
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  }

  // @Post('registry')
  // async registry(@Body() createUserDto: CreateUserDto) {
  //   return await this.authService.registration(createUserDto);
  // }
}
