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
import { AvatarDto } from '../auth/dto/file.dto';
import { SupabaseStorage } from '../storage/supabase.storage';
import { extname } from 'path';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private storage: SupabaseStorage,
  ) {}
  async create(body: CreateUserDto) {
    await this.userExistsCreate(body.cpf, body.email);
    const salt = await bcrypt.genSalt();

    body.password = await bcrypt.hash(body.password, salt);

    return this.prisma.user.create({
      data: body,
    });
  }

  async findAll({
    page,
    limit,
    orderBy,
    orderDirection,
    inactive,
    name,
    workLocation,
  }) {
    page = isNaN(page) || page < 1 ? 1 : page;
    limit = isNaN(limit) || limit < 1 ? 10 : limit;

    const skip = (page - 1) * limit;
    const take = limit;

    const queryConditions: any = {};

    // Filtro de usuários inativos ou ativos
    if (inactive !== undefined) {
      queryConditions.active = !inactive;
    }

    // Filtro por nome
    if (name) {
      queryConditions.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    // Filtro por local de trabalho
    if (workLocation) {
      queryConditions.workLocation = {
        contains: workLocation,
        mode: 'insensitive',
      };
    }

    // Ordenação
    const orderCriteria =
      orderBy === 'workLocation'
        ? { workLocation: orderDirection }
        : { name: orderDirection };

    return this.prisma.user.findMany({
      where: queryConditions,
      skip,
      take,
      orderBy: orderCriteria,
    });
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

    // Verifica se o objeto body contém a propriedade password e se ela não está vazia
    let hashedPassword: string;
    if (body.password !== undefined && body.password !== '') {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(body.password, salt);
    } else {
      // Se a senha não foi incluída ou é uma string vazia, não altere a senha
      hashedPassword = body.password; // Isso manterá a senha antiga se não houver uma nova senha
    }

    // Remove a propriedade password do body se ela não for alterada
    const dataToUpdate = {
      ...body,
      password: hashedPassword, // Use o hashedPassword que foi definido acima
    };

    // Exclua a propriedade password se ela não foi alterada
    if (hashedPassword === body.password) {
      delete dataToUpdate.password;
    }

    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    await this.uuidExists(id);

    return this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }

  async activateUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { active: true },
    });
  }

  async execute(data: AvatarDto) {
    if (!data.file) {
      throw new NotFoundException('File not found');
    }
    const extFile = extname(data.file.originalname).split('.')[1];
    const transformName = `${data.idUser}.${extFile}`;
    data.file.originalname = transformName;
    const file = await this.storage.upload(data.file, 'avatar');

    const pathAvatar = `${data.file.originalname}`;

    await this.uploadAvatar(data.idUser, pathAvatar);

    return file;
  }

  async getSingUrl(filePach: string) {
    return this.storage.getSignedUrl(filePach);
  }

  async getActiveUsers() {
    return await this.prisma.user.count({
      where: { active: true },
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

  async uploadAvatar(id: string, path: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        profileUrlImage: path,
      },
    });
  }
}
