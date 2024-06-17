import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() data: CreateUserDto) {
    if (!data.username || !data.password) {
      throw new BadRequestException('Usuário ou senha não podem ser vazios');
    }

    const user: User = await this.usersService.create(data);

    const token = await this.authService.login(user);

    return { user, token };
  }
}
