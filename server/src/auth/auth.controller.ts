import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ForgetAuthDto } from './dto/forget-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.tto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
import * as fs from 'fs';
import { join } from 'path';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forguet(@Body() body: ForgetAuthDto) {
    return this.authService.forget(body.email);
  }

  @Post('reset')
  async reset(@Body() body: ResetAuthDto) {
    return this.authService.reset(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { user };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('avatar')
  async uploadAvatar(
    @User() user,
    @UploadedFile('file') avatar: Express.Multer.File,
  ) {
    const avatarDirectory = join(__dirname, '..', '..', 'storage', 'avatar');

    //   Verifica se o diretório existe, caso não, cria
    if (!fs.existsSync(avatarDirectory)) {
      fs.mkdirSync(avatarDirectory, { recursive: true });
    }

    const filePath = join(avatarDirectory, `avatar-${user.id}.png`);

    return this.fileService.upload(avatar, filePath);
  }
}
