import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { Role } from '../../enums/role.enum';
import { IsCpf } from '../../decorators/validate-cpf.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  @IsCpf()
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: string;
}
