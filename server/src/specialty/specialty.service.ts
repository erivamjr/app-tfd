import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SpecialtyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    const existingSpecialty = await this.specialtyExists(
      createSpecialtyDto.name,
    );

    if (existingSpecialty) {
      if (existingSpecialty.active) {
        throw new ConflictException(
          `Specialty '${createSpecialtyDto.name}' already exists.`,
        );
      } else {
        throw new ConflictException(
          `Specialty '${createSpecialtyDto.name}' with '${existingSpecialty.id}' exists but is inactive. Consider reactivating it.`,
        );
      }
    }

    return this.prisma.specialty.create({
      data: { ...createSpecialtyDto, active: true },
    });
  }

  async findAll() {
    return this.prisma.specialty.findMany({
      where: { active: true },
    });
  }

  async findOne(id: number) {
    const specialty = await this.prisma.specialty.findUnique({
      where: { id },
    });

    if (!specialty || !specialty.active) {
      throw new NotFoundException(
        `Specialty with ID ${id} not found or inactive.`,
      );
    }

    return specialty;
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    await this.idExists(id);

    const existingSpecialty = await this.prisma.specialty.findFirst({
      where: {
        name: { contains: updateSpecialtyDto.name, mode: 'insensitive' },
        id: { not: id },
        active: true,
      },
    });

    if (existingSpecialty) {
      throw new ConflictException(
        `Specialty '${updateSpecialtyDto.name}' already exists.`,
      );
    }

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

  async reactivate(id: number) {
    const specialty = await this.prisma.specialty.findUnique({
      where: { id },
    });

    if (!specialty) {
      throw new NotFoundException(`Specialty ${id} not found`);
    }

    if (specialty.active) {
      throw new ConflictException(
        `Specialty ${specialty.name} is already active.`,
      );
    }

    return this.prisma.specialty.update({
      where: { id },
      data: { active: true },
    });
  }

  async idExists(id: number) {
    const specialty = await this.prisma.specialty.findUnique({
      where: { id },
    });

    if (!specialty || !specialty.active) {
      throw new NotFoundException(
        `Specialty with ID ${id} not found or inactive.`,
      );
    }

    return specialty;
  }

  async specialtyExists(specialty: string) {
    const existingSpecialty = await this.prisma.specialty.findFirst({
      where: {
        name: { contains: specialty, mode: 'insensitive' },
      },
    });

    return existingSpecialty;
  }
}
