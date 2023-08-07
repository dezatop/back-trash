import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreateUser } from '@/entities/users/dto/create-user.dto';
import { UsersService } from '@/entities/users/users.service';
import { User } from '@/entities/users/users.entity';
import { Login } from '@/entities/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async registration(userDto: CreateUser) {
    const candidate = await this.userService.getUserEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User already exist.', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    return await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
  }

  public async loginService(userDto: Login) {
    const user = await this.validateUser(userDto);
    delete user.password;
    const token = await this.generateToken(user);
    return {
      ...user,
      token,
    };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: Login) {
    const user = await this.userService.getUserEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
      });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }
}
