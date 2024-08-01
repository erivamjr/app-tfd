import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module';
import { UserModule } from './user/user.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [SpecialtyModule, UserModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
