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

  async create(userId: string, body: CreatePatientDto) {
    await this.isExistCpf(body.cpf);

    return this.prisma.patient.create({
      data: {
        ...body,
        userId: userId,
      },
    });
  }

  async findAll(paginationParams: {
    page: number;
    limit: number;
    orderBy?: 'name' | 'date';
    orderDirection?: 'asc' | 'desc';
  }) {
    const { page, limit, orderBy, orderDirection } = paginationParams;

    let paget = Number(page);
    let limitt = Number(limit);

    if (isNaN(page) || page <= 0) {
      paget = 1;
    }
    if (isNaN(limit) || limit <= 0) {
      limitt = 10;
    }
    const offset = (paget - 1) * limitt;

    // Configura a ordenação padrão
    const orderCriteria =
      orderBy === 'date'
        ? { createdAt: orderDirection || 'asc' }
        : { name: orderDirection || 'asc' };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({
        where: {
          active: true,
        },
        include: { user: true },
        skip: offset,
        take: limitt,
        orderBy: orderCriteria, // Adiciona a ordenação
      }),
      this.prisma.patient.count({
        where: {
          active: true,
        },
      }),
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

  async update(id: string, body: UpdatePatientDto) {
    await this.uuidExists(id);

    return this.prisma.patient.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.patient.update({
      where: { id },
      data: { active: false },
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
      include: { user: true },
    });

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
