import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '|dyy9>_dE>:)qe:/003GOjfC17]jrF)o',
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}