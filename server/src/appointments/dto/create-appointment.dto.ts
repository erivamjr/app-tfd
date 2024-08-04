import { Priority } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  appointmentDate: string;

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
  @IsString()
  requestDate: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsString()
  notes?: string;
}
