import { IsString, Length } from 'class-validator';

export class UpdateUser {
  @IsString()
  @Length(4, 30)
  readonly firstName: string;

  @IsString()
  @Length(4, 30)
  readonly lastName: string;
}
