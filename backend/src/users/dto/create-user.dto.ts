// import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  // @MinLength(5)
  degen_name: string;

  ticker: string;

  domain_name: string;

  email: string;

  x_username: string;

  dicord: string;

  token_address: string;

  telegram: string;
}
