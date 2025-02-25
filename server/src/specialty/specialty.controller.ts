import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  create(@Body() body: CreateSpecialtyDto) {
    return this.specialtyService.create(body);
  }

  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: string) {
    return this.specialtyService.findOne(id);
  }

  @Put(':id')
  update(@ParamId() id: string, @Body() body: UpdateSpecialtyDto) {
    return this.specialtyService.update(id, body);
  }

  @Delete(':id')
  remove(@ParamId() id: string) {
    return this.specialtyService.remove(id);
  }

  @Patch(':id')
  updateActivate(@ParamId() id: string) {
    return this.specialtyService.reactivate(id);
  }
}
