import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { SpecialtyModule } from './specialty/specialty.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 60,
        ttl: 60000,
        ignoreUserAgents: [/googlebot/gi],
      },
    ]),
    ConfigModule.forRoot(),
    SharedModule,
    UserModule,
    AuthModule,
    PatientsModule,
    SpecialtyModule,
    AppointmentsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'jadon.bogisich@ethereal.email',
          pass: 'nvdWh14V6HnvsnRPhh',
        },
      },
      defaults: {
        from: '"Tratamento Fora Domicilio" <erivamdev@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
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
