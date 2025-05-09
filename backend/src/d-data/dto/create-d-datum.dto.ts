import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateDDatumDto {
  @IsNotEmpty()
  ticker: string;

  @IsNotEmpty()
  contract_address: string;

  @IsNotEmpty()
  @IsString()
  tokenName: string;

  @IsNotEmpty()
  @IsString()
  token_description: string;

  @IsNotEmpty()
  @IsString()
  x_username: string;

  @IsNotEmpty()
  @IsString()
  telegram: string;

  @IsNotEmpty()
  @IsString()
  discord: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  banner: string;

  @IsEmpty()
  userId: User;
}
