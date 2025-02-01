import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  degen_name: string;

  @IsEmail({}, { message: 'Enter a correct email' })
  email: string;

  @MinLength(6)
  password: string;
}
