import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SpecialtyModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
