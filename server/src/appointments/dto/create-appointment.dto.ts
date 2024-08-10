import { Priority, Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  specialtyId: number;

  @IsNotEmpty()
  @IsString()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  appointmentDate: Date;

  @IsString()
  diagnosis?: string;

  @IsString()
  cid?: string;

  @IsString()
  requestingDoctor?: string;

  @IsString()
  crm?: string;

  @IsString()
  requestCode?: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  requestDate: Date;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsString()
  notes?: string;

  @IsBoolean()
  active: boolean;
}
