import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Status } from '@prisma/client';
import { AppointmentByMonth } from '../utils/utils';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalAppointments(startDate: Date, endDate: Date) {
    return this.prisma.appointment.count({
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
    });
  }

  async getAppointmentsByStatus(startDate: Date, endDate: Date) {
    const statuses = [Status.InProgress, Status.Scheduled, Status.Completed];
    const statusCount = {};

    for (const status of statuses) {
      statusCount[status] = await this.prisma.appointment.count({
        where: {
          status,
          createdAt: { gte: startDate, lte: endDate },
        },
      });
    }

    return statusCount;
  }

  async getAppointmentsByMonth(startDate: Date, endDate: Date) {
    const appointmentsByMonth = await this.prisma.$queryRaw<
      AppointmentByMonth[]
    >`
      SELECT
        EXTRACT(MONTH FROM "createdAt") AS month,
        EXTRACT(YEAR FROM "createdAt") AS year,
        COUNT(*) AS total
      FROM "Appointment"
      WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${endDate}
      GROUP BY EXTRACT(MONTH FROM "createdAt"), EXTRACT(YEAR FROM "createdAt")
      ORDER BY year ASC, month ASC;
    `;

    // Convertendo BigInt para Number
    return appointmentsByMonth.map((appointment) => ({
      ...appointment,
      total: Number(appointment.total), // Converte para Number
    }));
  }

  async getAppointmentsByStatusAndMonth(startDate: Date, endDate: Date) {
    // Fazendo a consulta com a tipagem explícita
    const appointmentsByStatusAndMonth = await this.prisma.$queryRaw<
      {
        status: string;
        month: number;
        year: number;
        count: bigint;
      }[]
    >`
      SELECT
        status,
        EXTRACT(MONTH FROM "createdAt") AS month,
        EXTRACT(YEAR FROM "createdAt") AS year,
        COUNT(*) AS count
      FROM "Appointment"
      WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${endDate}
      GROUP BY status, month, year
      ORDER BY year ASC, month ASC;
    `;

    // Verificando e mapeando o resultado para converter BigInt para Number
    return appointmentsByStatusAndMonth.map((appointment) => ({
      status: appointment.status,
      month: appointment.month,
      year: appointment.year,
      count: Number(appointment.count), // Converte de BigInt para Number
    }));
  }

  async getTopClassifications(startDate: Date, endDate: Date) {
    const classifications = await this.prisma.appointment.groupBy({
      by: ['priority'],
      _count: {
        priority: true,
      },
      orderBy: {
        _count: {
          priority: 'desc',
        },
      },
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
      take: 3,
    });

    return classifications.map((classification) => ({
      priority: classification.priority,
      count: classification._count.priority,
    }));
  }

  async getTopPatients(startDate: Date, endDate: Date) {
    const topPatientsIds = await this.prisma.appointment.groupBy({
      by: ['patientId'],
      _count: {
        patientId: true,
      },
      orderBy: {
        _count: {
          patientId: 'desc',
        },
      },
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
      take: 10,
    });

    const patientIds = topPatientsIds.map((patient) => patient.patientId);

    const patients = await this.prisma.patient.findMany({
      where: {
        id: { in: patientIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return topPatientsIds.map((patient) => {
      const patientInfo = patients.find((p) => p.id === patient.patientId);
      return {
        name: patientInfo?.name,
        appointmentCount: patient._count.patientId,
      };
    });
  }

  async getTopSpecialties(startDate: Date, endDate: Date) {
    const specialties = await this.prisma.appointment.groupBy({
      by: ['specialtyId'],
      _count: {
        specialtyId: true,
      },
      orderBy: {
        _count: {
          specialtyId: 'desc',
        },
      },
      where: {
        createdAt: { gte: startDate, lte: endDate },
      },
      take: 3,
    });

    const specialtyIds = specialties.map((specialty) => specialty.specialtyId);
    const specialtyNames = await this.prisma.specialty.findMany({
      where: {
        id: { in: specialtyIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return specialties.map((specialty) => {
      const specialtyData = specialtyNames.find(
        (item) => item.id === specialty.specialtyId,
      );
      return {
        specialty: specialtyData?.name || 'Unknown',
        count: specialty._count.specialtyId,
      };
    });
  }
}
