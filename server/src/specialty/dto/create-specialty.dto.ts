import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSpecialtyDto {
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsBoolean()
  active: boolean;
}
