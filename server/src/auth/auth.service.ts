import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from '../user/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';
  private frontendUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl =
      this.configService.get<string>(process.env.FRONTEND_URL) ||
      'http://localhost:3000';
  }

  generateToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);

      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.active) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hash = await bcrypt.compare(password, user.password);

    if (!hash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '15 minutes', // was 15 minutes
        subject: String(user.id),
        issuer: 'forget',
        audience: this.audience,
      },
    );

    const resetUrl = `${this.frontendUrl}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      html: `
        <p>Olá, ${user.name}!</p>
        <p>Recebemos uma solicitação para redefinir sua senha.</p>
        <p>Clique no link abaixo para criar uma nova senha:</p>
        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Redefinir senha</a>
        <p>Se você não solicitou a alteração, ignore este e-mail.</p>
        <p><strong>Este link expira em 15 minutos.</strong></p>
      `,
    });

    return { message: 'Recovery email sent!' };
  }

  async reset(password: string, token: string) {
    //TO DO if token is valid
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: this.audience,
      });
      const id = data.id; // TO DO get id from token

      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: await bcrypt.hash(password, 10),
        },
      });

      return this.generateToken(user);
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }

  async register(data: RegisterAuthDto) {
    const user = await this.userService.create(data);

    return this.generateToken(user);
  }
}
