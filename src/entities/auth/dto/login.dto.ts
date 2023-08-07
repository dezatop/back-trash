import {IsEmail, IsString, Length} from "class-validator";

export class Login {
  @IsString()
  @Length(2, 100)
  @IsEmail({}, {message: "Don't correct email"})
  readonly email: string

  @IsString()
  @Length(4, 50, {message: 'min: 4, max: 50'})
  readonly password: string;
}
