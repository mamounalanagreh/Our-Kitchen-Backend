import { IsEmail, isEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
