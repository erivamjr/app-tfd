import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialtyModule } from './specialty/specialty.module';

@Module({
  imports: [SpecialtyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
