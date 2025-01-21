import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

import { User } from '../decorators/user.decorator';
import { SearchPatientDto } from './dto/search-patient.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Roles(Role.ADMIN, Role.USER)
@UseGuards(AuthGuard, RoleGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@User('id') id, @Body() body: CreatePatientDto) {
    return this.patientsService.create(id, body);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderBy') orderBy: 'name' | 'date' = 'name',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
    @Query('includeInactive') includeInactive: boolean = false,
  ) {
    return this.patientsService.findAll({
      page,
      limit,
      orderBy,
      orderDirection,
      includeInactive,
    });
  }

  @Get('search')
  search(@Query() searchPatient: SearchPatientDto) {
    return this.patientsService.search(searchPatient);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePatientDto) {
    return this.patientsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }

  @Patch('reactivate')
  async reactivateByCpf(@Query('cpf') cpf: string) {
    return this.patientsService.reactivate(cpf);
  }
}
