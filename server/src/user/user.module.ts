import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../database/prisma.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
