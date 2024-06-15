// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async create(@Body() data: { username: string; password: string }) {
    const user: User = await this.usersService.create(data);

    // Gerar e retornar o token JWT
    const token = await this.authService.login(user);

    return { user, token };
  }
}
