// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login com Sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais Inválidas' })
  async login(@Body() credentials: LoginDto) {
    const { username, password } = credentials;

    if (!username || !password) {
      throw new HttpException(
        'Usuário e Senha requeridos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Credenciais Inválidas', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.login(user);

    return { message: 'Logado com Sucesso', token };
  }
}
