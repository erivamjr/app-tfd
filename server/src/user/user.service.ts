import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dataUser: CreateUserDto) {
    const salt = await bcrypt.genSalt();

    dataUser.password = await bcrypt.hash(dataUser.password, salt);

    return this.prisma.user.create({
      data: dataUser,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    await this.uuidExists(id);

    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, bodyUser: UpdateUserDto) {
    await this.uuidExists(id);

    const salt = await bcrypt.genSalt();

    bodyUser.password = await bcrypt.hash(bodyUser.password, salt);

    return this.prisma.user.update({
      where: { id },
      data: bodyUser,
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async uuidExists(id: string) {
    const user = await this.prisma.user.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Specialty ${id} not found`);
    }
  }
}
