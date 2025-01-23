import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-appointments')
  getTotalAppointments(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getTotalAppointments(startDate, endDate);
  }

  @Get('appointments-by-status')
  getAppointmentsByStatus(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getAppointmentsByStatus(startDate, endDate);
  }

  @Get('appointments-by-month')
  getAppointmentsByMonth(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getAppointmentsByMonth(startDate, endDate);
  }

  @Get('appointments-by-status-and-month')
  getAppointmentsByStatusAndMonth(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getAppointmentsByStatusAndMonth(
      startDate,
      endDate,
    );
  }

  @Get('top-classifications')
  getTopClassifications(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getTopClassifications(startDate, endDate);
  }

  @Get('top-patients')
  getTopPatients(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getTopPatients(startDate, endDate);
  }

  @Get('top-specialties')
  async getTopSpecialties(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService.getTopSpecialties(startDate, endDate);
  }
}
