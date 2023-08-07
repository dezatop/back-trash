import { Module } from '@nestjs/common';

import { AuthController } from '@/entities/auth/auth.controller';
import { AuthService } from '@/entities/auth/auth.service';
import { UsersModule } from '@/entities/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
