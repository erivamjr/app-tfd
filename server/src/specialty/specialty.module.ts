import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { PrismaModule } from '../database/prisma.module';
import { SpecialtyIdCheckMiddleware } from '../middlewares/specialty-id-checkmiddlewares';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
})
export class SpecialtyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SpecialtyIdCheckMiddleware).forRoutes({
      path: 'specialties/:id',
      method: RequestMethod.ALL,
    });
  }
}
