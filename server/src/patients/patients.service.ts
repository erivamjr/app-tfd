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

  async findAll(paginationParams: { page: number; limit: number }) {
    const { page, limit } = paginationParams;

    let paget = Number(page);
    let limitt = Number(limit);

    if (isNaN(page) || page <= 0) {
      paget = 1;
    }
    if (isNaN(limit) || limit <= 0) {
      limitt = 10;
    }
    const offset = (paget - 1) * limitt;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({
        skip: offset,
        take: limitt,
      }),
      this.prisma.patient.count(),
    ]);

    return {
      data,
      total,
      page: paget,
      pageCount: Math.ceil(total / limitt),
    };
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

  async search(name?: string, cpf?: string) {
    const patients = await this.prisma.patient.findMany({
      where: {
        OR: [
          { name: { contains: name, mode: 'insensitive' } },
          { cpf: { contains: cpf, mode: 'insensitive' } },
        ],
      },
    });

    if (!patients.length) {
      throw new NotFoundException('Patients not found');
    }

    return patients;
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
    const user = await this.prisma.patient.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
  }
}
