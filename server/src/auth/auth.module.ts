import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { PrismaModule } from '../database/prisma.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SharedModule, PrismaModule, SharedModule, FileModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
