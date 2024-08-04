import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPatientDto: CreatePatientDto) {
    await this.isExistCpf(createPatientDto.cpf);

    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        priority: createPatientDto.priority,
        userId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany();
  }

  async findOne(id: string) {
    await this.uuidExists(id);

    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.uuidExists(id);

    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.patient.delete({
      where: { id },
    });
  }

  async search(name: string) {
    return this.prisma.patient.findMany({
      where: { name: { contains: name } },
    });
  }

  async isExistCpf(cpf: string) {
    const patient = await this.prisma.patient.count({
      where: { cpf },
    });

    if (patient) {
      throw new ConflictException('Patient already exists');
    }
  }

  async uuidExists(id: string) {
    const user = await this.prisma.user.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Specialty ${id} not found`);
    }
  }
}
