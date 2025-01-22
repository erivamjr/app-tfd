import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from '../user/users.module';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
