import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateDDatumDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  ticker: string;

  @IsNotEmpty()
  contract_address: string;

  @IsNotEmpty()
  @IsString()
  x_username: string;

  @IsNotEmpty()
  @IsString()
  telegram: string;

  @IsNotEmpty()
  @IsString()
  discord: string;
}
