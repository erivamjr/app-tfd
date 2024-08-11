import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { formatCpf } from '../utils/utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(body: CreateUserDto) {
    await this.userExistsCreate(body.cpf, body.email);
    const salt = await bcrypt.genSalt();

    body.password = await bcrypt.hash(body.password, salt);

    return this.prisma.user.create({
      data: body,
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { active: true },
    });

    return users.map((user) => ({
      ...user,
      cpf: formatCpf(user.cpf),
    }));
  }

  async findOne(id: string) {
    await this.uuidExists(id);

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user.active) {
      throw new NotFoundException(
        `User ${id} is inactive and cannot be found, request a reactivation by admin.`,
      );
    }

    return { ...user, cpf: formatCpf(user.cpf) };
  }

  async update(id: string, body: UpdateUserDto) {
    await this.uuidExists(id);
    await this.userExistsUpdate(id, body.cpf, body.email);

    const salt = await bcrypt.genSalt();

    body.password = await bcrypt.hash(body.password, salt);

    return this.prisma.user.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }

  async userExistsCreate(cpf: string, email: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ cpf: cpf }, { email: email }, { active: false }],
      },
    });

    if (existingUser) {
      if (existingUser.cpf === cpf) {
        throw new ConflictException('CPF already in use by another user.');
      } else if (existingUser.email === email) {
        throw new ConflictException('Email already in use by another user.');
      } else if (!existingUser.active) {
        throw new ConflictException(
          'User is inactive and cannot be created, request a reactivation by admin.',
        );
      }
    }
  }

  async userExistsUpdate(id: string, cpf: string, email: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [{ cpf: cpf }, { email: email }],
          },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.cpf === cpf) {
        throw new ConflictException('CPF already in use by another user.');
      } else if (existingUser.email === email) {
        throw new ConflictException('Email already in use by another user.');
      }
    }
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
