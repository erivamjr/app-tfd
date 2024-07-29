import { IsString, Min } from 'class-validator';

export class CreateSpecialtyDto {
  @Min(3)
  @IsString()
  name: string;
}
