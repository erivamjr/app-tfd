import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '../auth/dto/file.dto';
import { User } from '../decorators/user.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderBy') orderBy: 'name' | 'workLocation' = 'name',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
    @Query('name') name?: string,
    @Query('workLocation') workLocation?: string,
    @Query('inactive') inactive?: boolean,
  ) {
    return this.userService.findAll({
      page,
      limit,
      orderBy,
      orderDirection,
      name,
      workLocation,
      inactive,
    });
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    console.log('Chegou no backend', body);
    return this.userService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/activate')
  async activateUser(@Param('id') id: string) {
    return this.userService.activateUser(id);
  }

  @UseGuards(AuthGuard)
  @Put('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@User() user, @UploadedFile() file: FileDto) {
    const result = await this.userService.execute({
      idUser: user.id,
      file,
    });

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('/signed-url/:filePath')
  async getSignedUrl(@Param('filePath') filePath: string) {
    const signedUrl = await this.userService.getSingUrl(filePath);
    return { signedUrl };
  }
}
