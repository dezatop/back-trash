import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Headers,
} from '@nestjs/common';

import { AuthService } from '@/entities/auth/auth.service';
import { CreateUser } from '@/entities/users/dto/create-user.dto';
import { Login } from '@/entities/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async getAllUsers(@Body() userDto: CreateUser) {
    await this.authService.registration(userDto);
    return { status: true };
  }

  @Post('login')
  async login(@Body() loginDto: Login) {
    return await this.authService.loginService(loginDto);
  }
}
