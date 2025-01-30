// import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  // @MinLength(5)
  degen_name: string;

  ticker: string;
}
