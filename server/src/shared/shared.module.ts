import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../user/users.service';
import { PrismaModule } from '../database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseStorage } from '../storage/supabase.storage';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ConfigModule.forRoot(),
  ],

  providers: [AuthService, UsersService, SupabaseStorage],
  exports: [
    AuthService,
    UsersService,
    JwtModule,
    SupabaseStorage,
    ConfigModule,
  ],
})
export class SharedModule {}
