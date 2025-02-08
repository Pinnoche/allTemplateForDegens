import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/schema/roles.schema';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  degen_name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Enter a correct email' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmpty()
  roleId: Role;

  roleName: string;
}
