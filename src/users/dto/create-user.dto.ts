import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Escolha um nome de usuário' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Insira sua senha' })
  @IsNotEmpty()
  password!: string;
}
