// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const { username, password } = credentials;

    // Chama o método validateUser do serviço de autenticação
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // Gera e retorna um token JWT se a autenticação for bem-sucedida
    return this.authService.login(user);
  }
}
