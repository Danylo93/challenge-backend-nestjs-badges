import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    forwardRef(() => UsersModule), 
    PassportModule,
    JwtModule.register({
      secret: 'teste-tecnico', // Substitua por uma chave secreta mais segura
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
