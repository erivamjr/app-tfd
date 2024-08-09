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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

import { User } from '../decorators/user.decorator';
import { SearchPatientDto } from './dto/search-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@User('id') id, @Body() body: CreatePatientDto) {
    return this.patientsService.create(id, body);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.patientsService.findAll({ page, limit });
  }

  @Get('search')
  search(@Query() searchPatient: SearchPatientDto) {
    const { name, cpf } = searchPatient;
    return this.patientsService.search(name, cpf);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePatientDto) {
    return this.patientsService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
