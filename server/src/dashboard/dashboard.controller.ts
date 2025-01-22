import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-appointments')
  getTotalAppointments(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão (data atual)
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getTotalAppointments(
      startDateParsed,
      endDateParsed,
    );
  }

  @Get('appointments-by-status')
  getAppointmentsByStatus(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getAppointmentsByStatus(
      startDateParsed,
      endDateParsed,
    );
  }

  @Get('appointments-by-month')
  getAppointmentsByMonth(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getAppointmentsByMonth(
      startDateParsed,
      endDateParsed,
    );
  }

  @Get('appointments-by-status-and-month')
  getAppointmentsByStatusAndMonth(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getAppointmentsByStatusAndMonth(
      startDateParsed,
      endDateParsed,
    );
  }

  @Get('top-classifications')
  getTopClassifications(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getTopClassifications(
      startDateParsed,
      endDateParsed,
    );
  }

  @Get('top-patients')
  getTopPatients(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getTopPatients(startDateParsed, endDateParsed);
  }

  @Get('top-specialties')
  getTopSpecialties(
    @Query('startDate') startDate: string = '2024-01-01', // Data inicial padrão
    @Query('endDate') endDate: string = new Date().toISOString(), // Data final padrão
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);
    return this.dashboardService.getTopSpecialties(
      startDateParsed,
      endDateParsed,
    );
  }
}
