import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SpecialtyModule } from './specialty/specialty.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './file/file.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 60,
        ttl: 60000,
        ignoreUserAgents: [/googlebot/gi],
      },
    ]),
    ConfigModule.forRoot(), // Carrega variáveis do .env
    SharedModule,
    UsersModule,
    AuthModule,
    PatientsModule,
    SpecialtyModule,
    AppointmentsModule,
    FileModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'SendGrid',
          auth: {
            user: 'apikey', // Sempre "apikey" no SendGrid
            pass: configService.get<string>('SENDGRID_API_KEY'), // Obtém a chave do .env
          },
        },
        defaults: {
          from: `"Tratamento Fora Domicílio" <${configService.get<string>('SENDGRID_FROM_EMAIL')}>`, // Certifique-se de que este e-mail está verificado no SendGrid
        },
      }),
      inject: [ConfigService],
    }),
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
