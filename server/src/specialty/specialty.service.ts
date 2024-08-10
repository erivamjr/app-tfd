import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SpecialtyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    return this.prisma.specialty.create({
      data: createSpecialtyDto,
    });
  }

  async findAll() {
    return this.prisma.specialty.findMany();
  }

  async findOne(id: number) {
    await this.idExists(id);

    return this.prisma.specialty.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    await this.idExists(id);

    return this.prisma.specialty.update({
      where: { id },
      data: updateSpecialtyDto,
    });
  }

  async remove(id: number) {
    await this.idExists(id);

    return this.prisma.specialty.update({
      where: { id },
      data: { active: false },
    });
  }

  async idExists(id: number) {
    const specialty = await this.prisma.specialty.count({
      where: { id },
    });

    if (!specialty) {
      throw new NotFoundException(`Specialty ${id} not found`);
    }
  }
}
