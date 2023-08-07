import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from '@/entities/company/company.entity';
import { FileModule } from '@/entities/file/file.module';
import { CompanyController } from '@/entities/company/company.controller';
import { CompanyService } from '@/entities/company/company.service';
import { UsersModule } from '@/entities/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), FileModule, UsersModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
