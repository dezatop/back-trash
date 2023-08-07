import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUser {
  @IsString()
  @Length(4, 30)
  readonly firstName: string;

  @IsString()
  @Length(4, 30)
  readonly lastName: string;

  @IsString()
  @Length(2, 100)
  @IsEmail({}, { message: "Don't correct email" })
  readonly email: string;

  @IsString()
  @Length(4, 50, { message: 'min: 4, max: 50' })
  readonly password: string;
}
