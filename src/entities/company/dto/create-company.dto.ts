import { IsString, Length } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateCompanyDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(2, 30)
  readonly companyName: string;

  @IsString()
  @Length(2, 100)
  readonly companyAddress: string;

  @IsString()
  @Length(2, 50)
  readonly companyContacts: string;
}
