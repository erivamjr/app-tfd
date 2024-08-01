import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ParamId } from '../decorators/param-id.decorator';

@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.specialtyService.findOne(id);
  }

  @Patch(':id')
  update(
    @ParamId() id: number,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(id, updateSpecialtyDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.specialtyService.remove(id);
  }
}
