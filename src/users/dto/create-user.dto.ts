// src/users/dto/create-user.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Escolha um nome de usuário' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Insira uma senha' })
  @IsNotEmpty()
  password!: string;
}
