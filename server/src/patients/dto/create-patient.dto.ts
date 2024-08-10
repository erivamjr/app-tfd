import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  gender?: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  susCard?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  birthDate?: Date;

  @IsString()
  @IsOptional()
  motherName?: string;

  @IsBoolean()
  active: boolean;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;
}
