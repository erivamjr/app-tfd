import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../database/prisma.service';
import { SearchPatientDto } from './dto/search-patient.dto';

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
    includeInactive?: boolean;
  }) {
    const { page, limit, orderBy, orderDirection, includeInactive } =
      paginationParams;

    const paget = isNaN(page) || page <= 0 ? 1 : page;
    const limitt = isNaN(limit) || limit <= 0 ? 10 : limit;

    const offset = (paget - 1) * limitt;

    const orderCriteria =
      orderBy === 'date'
        ? { createdAt: orderDirection }
        : { name: orderDirection };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({
        where: {
          active: includeInactive ? undefined : true,
        },
        include: { user: true },
        skip: offset,
        take: limitt,
        orderBy: orderCriteria,
      }),
      this.prisma.patient.count({
        where: {
          active: includeInactive ? undefined : true,
        },
      }),
    ]);

    return {
      data,
      total,
      page: paget,
      limit: limitt,
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

  async reactivate(cpf: string) {
    return this.prisma.patient.updateMany({
      where: {
        cpf,
        active: false,
      },
      data: {
        active: true,
      },
    });
  }

  async search({ name, cpf, inactive }: SearchPatientDto) {
    console.log(name, cpf, inactive);

    const whereConditions: any = {};

    if (name || cpf) {
      whereConditions.OR = [
        { name: { contains: name, mode: 'insensitive' } },
        { cpf: { contains: cpf, mode: 'insensitive' } },
      ];
    }

    if (inactive !== undefined) {
      whereConditions.active = !inactive;
    }

    if (!name && !cpf && inactive === undefined) {
      return this.prisma.patient.findMany({
        include: { user: true },
      });
    }

    return this.prisma.patient.findMany({
      where: whereConditions,
      include: { user: true },
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
    const user = await this.prisma.patient.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
  }
}
