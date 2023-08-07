import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/entities/users/users.entity';
import { CreateUser } from '@/entities/users/dto/create-user.dto';
import { userFields } from '@/utils/const';
import { filterFields } from '@/utils/helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(userData: CreateUser) {
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return true;
  }

  public async getUserEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  public async getUsers(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return filterFields(user, userFields);
  }

  public async updateUser(userId, userDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.lastName = userDto.lastName;
    user.firstName = userDto.firstName;
    await this.userRepository.save(user);
    return { status: true };
  }
}
