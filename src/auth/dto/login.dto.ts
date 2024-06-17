import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Usuário' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Senha' })
  @IsNotEmpty()
  password!: string;
}
