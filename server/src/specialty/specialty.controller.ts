import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ParamId } from '../decorators/param-id.decorator';

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
  findOne(@ParamId() id: number) {
    return this.specialtyService.findOne(id);
  }

  @Put(':id')
  update(@ParamId() id: number, @Body() body: UpdateSpecialtyDto) {
    return this.specialtyService.update(id, body);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.specialtyService.remove(id);
  }

  @Patch(':id')
  updateActivate(@ParamId() id: number) {
    return this.specialtyService.reactivate(id);
  }
}
