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
    return this.prisma.appointment.findMany();
  }

  async findOne(id: string) {
    await this.uuidExists(id);

    return this.prisma.appointment.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    await this.uuidExists(id);

    return this.prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        ...updateAppointmentDto,
      },
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.appointment.delete({
      where: {
        id: id,
      },
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
}
