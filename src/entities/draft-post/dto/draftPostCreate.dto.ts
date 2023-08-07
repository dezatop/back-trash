import { IsNumber, IsString, Length } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class DraftPostCreate {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(2, 255)
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly company_id: number;
}
