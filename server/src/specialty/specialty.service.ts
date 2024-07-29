import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SpecialtyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    console.log(createSpecialtyDto);

    return this.prisma.specialty.create({
      data: createSpecialtyDto,
    });
  }

  async findAll() {
    return this.prisma.specialty.findMany();
  }

  async findOne(id: number) {
    return this.prisma.specialty.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.prisma.specialty.update({
      where: { id },
      data: updateSpecialtyDto,
    });
  }

  async remove(id: number) {
    return this.prisma.specialty.delete({
      where: { id },
    });
  }
}
