import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentFilterDto } from './dto/filter-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() body: CreateAppointmentDto) {
    return this.appointmentsService.create(body);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderBy') orderBy: 'createdAt' | 'status' = 'createdAt',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
  ) {
    return this.appointmentsService.findAll({
      page,
      limit,
      orderBy,
      orderDirection,
    });
  }

  @Get('filtered')
  async getFilteredAppointments(@Query() filters: AppointmentFilterDto) {
    return this.appointmentsService.getFilteredAppointments(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
