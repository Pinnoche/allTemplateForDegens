import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Enter a correct email' })
  email: string;

  @MinLength(6)
  password: string;
}
