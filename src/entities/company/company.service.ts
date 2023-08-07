import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from '@/entities/company/company.entity';
import { CreateCompanyDto } from '@/entities/company/dto/create-company.dto';
import { FileService } from '@/entities/file/file.service';
import { UsersService } from '@/entities/users/users.service';

interface CreateCompanyDtoFile extends CreateCompanyDto {
  companyLogo?: string;
}

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly fileService: FileService,
    private readonly userService: UsersService,
  ) {}

  async addNewCompany(
    dtoCompany: CreateCompanyDtoFile,
    file: Express.Multer.File,
    id,
  ) {
    const data = { ...dtoCompany, user: { id } };

    if (file) {
      data.companyLogo = await this.fileService.saveFile(file, 'company');
    }

    const newUser = this.companyRepository.create(data);
    await this.companyRepository.save(newUser);
    delete newUser.user;
    return newUser;
  }

  async searchCompanyUser(companyId, usedId) {
    const flagFind = await this.companyRepository.findOne({
      where: { id: companyId, user: { id: usedId } },
      relations: ['user'],
    });

    return !!flagFind;
  }

  async getCompany() {
    return await this.companyRepository.find({
      where: { id: 9 },
      relations: ['user'],
    });
  }
}
