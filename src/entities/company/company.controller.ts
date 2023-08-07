import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CompanyService } from '@/entities/company/company.service';
import { CreateCompanyDto } from '@/entities/company/dto/create-company.dto';
import { JwtAuthGuard } from '@/entities/jwt/jwt-auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('companyLogo'))
  async companyCreate(
    @Request() req: any,
    @Body() companyDto: CreateCompanyDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.companyService.addNewCompany(
      companyDto,
      image,
      req.user.id,
    );
  }

  @Get('')
  async getCompany() {
    return await this.companyService.getCompany();
  }
}
