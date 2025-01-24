import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Status } from '@prisma/client';
import { AppointmentByMonth } from '../utils/utils';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalAppointments(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

    return this.prisma.appointment.count({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  async getAppointmentsByStatus(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

    const statuses = [Status.InProgress, Status.Scheduled, Status.Completed];
    const statusCount = {};

    for (const status of statuses) {
      statusCount[status] = await this.prisma.appointment.count({
        where: {
          status,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });
    }

    return statusCount;
  }

  async getAppointmentsByMonth(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

    const appointmentsByMonth = await this.prisma.$queryRaw<
      AppointmentByMonth[]
    >`
      SELECT
        EXTRACT(MONTH FROM "createdAt") AS month,
        EXTRACT(YEAR FROM "createdAt") AS year,
        COUNT(*) AS total
      FROM "Appointment"
      WHERE "createdAt" BETWEEN ${start} AND ${end}
      GROUP BY EXTRACT(MONTH FROM "createdAt"), EXTRACT(YEAR FROM "createdAt")
      ORDER BY year ASC, month ASC;
    `;

    return appointmentsByMonth.map((appointment) => ({
      ...appointment,
      total: appointment.total.toString(),
    }));
  }

  async getAppointmentsByStatusAndMonth(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

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
      WHERE "createdAt" BETWEEN ${start} AND ${end}
      GROUP BY status, month, year
      ORDER BY year ASC, month ASC;
    `;

    return appointmentsByStatusAndMonth.map((appointment) => ({
      status: appointment.status,
      month: appointment.month,
      year: appointment.year,
      count: Number(appointment.count),
    }));
  }

  async getTopClassifications(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

    const classifications = await this.prisma.appointment.groupBy({
      by: ['priority'],
      _count: {
        priority: true,
      },
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        _count: {
          priority: 'desc',
        },
      },
      take: 3,
    });

    return classifications.map((classification) => ({
      priority: classification.priority,
      count: classification._count.priority,
    }));
  }

  async getTopSpecialties(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

    const specialties = await this.prisma.appointment.groupBy({
      by: ['specialtyId'],
      _count: {
        specialtyId: true,
      },
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        _count: {
          specialtyId: 'desc',
        },
      },
      take: 10,
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

    const result = specialties.map((specialty) => {
      const specialtyData = specialtyNames.find(
        (item) => item.id === specialty.specialtyId,
      );
      return {
        specialty: specialtyData?.name || 'Unknown',
        count: specialty._count.specialtyId,
      };
    });

    return result;
  }

  async getTopPatients(startDate: string, endDate: string) {
    const start = new Date(startDate || '2024-01-01');
    const end = new Date(endDate || new Date());

    const topPatientsIds = await this.prisma.appointment.groupBy({
      by: ['patientId'],
      _count: {
        patientId: true,
      },
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        _count: {
          patientId: 'desc',
        },
      },
      take: 10,
    });

    const patientIds = topPatientsIds.map((patient) => patient.patientId);

    const patients = await this.prisma.patient.findMany({
      where: {
        id: {
          in: patientIds,
        },
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
}
