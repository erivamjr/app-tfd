import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        priority: createPatientDto.priority, // Assegure-se de que está passando a enum corretamente
        user: {
          connect: { id: createPatientDto.user.connect.id },
        },
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: string) {
    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  remove(id: string) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
