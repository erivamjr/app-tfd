import { IsOptional, IsString } from 'class-validator';

export class SearchPatientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;
}
