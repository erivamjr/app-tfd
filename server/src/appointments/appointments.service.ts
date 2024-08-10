import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        ...body,
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: { patient: true, specialty: true },
    });
  }

  async findOne(id: string) {
    await this.uuidExists(id);

    return this.prisma.appointment.findUnique({
      where: {
        id: id,
      },
      include: { patient: true, specialty: true },
    });
  }

  async update(id: string, body: UpdateAppointmentDto) {
    await this.uuidExists(id);

    await this.findBySpecialtyIdAndPatientId(body.specialtyId, body.patientId);
    return this.prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.appointment.update({
      where: { id },
      data: { active: false },
    });
  }

  async uuidExists(id: string) {
    const user = await this.prisma.appointment.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
  }

  async findBySpecialtyIdAndPatientId(specialty: number, patient: string) {
    const specialtyId = await this.prisma.specialty.count({
      where: {
        id: specialty,
      },
    });

    const patientId = await this.prisma.patient.count({
      where: {
        id: patient,
      },
    });

    if (!specialtyId || !patientId) {
      throw new NotFoundException(
        `Specialty ${specialtyId} and Patient ${patientId} not found`,
      );
    }
  }
}
