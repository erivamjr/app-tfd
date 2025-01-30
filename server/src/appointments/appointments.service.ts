import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../database/prisma.service';
import { AppointmentFilterDto } from './dto/filter-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateAppointmentDto) {
    await this.findBySpecialtyIdAndPatientId(body.specialtyId, body.patientId);
    return this.prisma.appointment.create({
      data: {
        ...body,
      },
    });
  }

  async findAll({ page, limit, orderBy, orderDirection }) {
    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    const skip = (page - 1) * limit;
    const take = limit;

    let orderCriteria = {};

    if (orderBy === 'createdAt') {
      orderCriteria = {
        createdAt: orderDirection,
      };
    } else if (orderBy === 'status') {
      orderCriteria = {
        status: orderDirection,
      };
    } else {
      orderCriteria = {
        [orderBy]: orderDirection,
      };
    }

    return this.prisma.appointment.findMany({
      skip,
      take,
      orderBy: orderCriteria,
      include: {
        patient: true,
        specialty: true,
      },
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

  async getFilteredAppointments(filter: AppointmentFilterDto) {
    const {
      isPregnant,
      hasHypertension,
      hasDiabetes,
      isBedridden,
      hasCourtOrder,
      isSuspected,
      createdAt,
      specialty,
      status,
      priority,
      search,
      startDate,
      endDate,
      active,
    } = filter;

    const queryConditions: any = {
      active: true,
    };

    if (search) {
      queryConditions.OR = [
        { patient: { name: { contains: search, mode: 'insensitive' } } },
        { specialty: { name: { contains: search, mode: 'insensitive' } } },
        { patient: { cpf: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (isPregnant !== undefined) {
      queryConditions.isPregnant = isPregnant;
    }
    if (hasHypertension !== undefined) {
      queryConditions.hasHypertension = hasHypertension;
    }
    if (hasDiabetes !== undefined) {
      queryConditions.hasDiabetes = hasDiabetes;
    }
    if (isBedridden !== undefined) {
      queryConditions.isBedridden = isBedridden;
    }
    if (hasCourtOrder !== undefined) {
      queryConditions.hasCourtOrder = hasCourtOrder;
    }
    if (isSuspected !== undefined) {
      queryConditions.isSuspected = isSuspected;
    }

    if (createdAt) {
      queryConditions.createdAt = { gte: new Date(createdAt) };
    }
    if (startDate && endDate) {
      queryConditions.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (specialty) {
      queryConditions.specialty = {
        name: { contains: specialty, mode: 'insensitive' },
      };
    }
    if (status) {
      queryConditions.status = status;
    }
    if (priority) {
      queryConditions.priority = priority;
    }

    if (active !== undefined) {
      queryConditions.active = active;
    }

    return this.prisma.appointment.findMany({
      where: queryConditions,
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
