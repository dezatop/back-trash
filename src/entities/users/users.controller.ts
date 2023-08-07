import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '@/entities/users/users.service';
import { JwtAuthGuard } from '@/entities/jwt/jwt-auth.guard';
import { UpdateUser } from '@/entities/users/dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUserInfo(@Request() req) {
    return await this.userService.getUsers(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async updateUser(@Request() req, @Body() userDto: UpdateUser) {
    return await this.userService.updateUser(req.user.id, userDto);
  }

  @Post('/')
  async uploadUserPhoto() {
    return '1';
  }
}
