import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class AppointmentFilterDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPregnant?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasHypertension?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasDiabetes?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isBedridden?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasCourtOrder?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isSuspected?: boolean;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt?: Date;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : undefined,
  )
  active?: boolean;
}
