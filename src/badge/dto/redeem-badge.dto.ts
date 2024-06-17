import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemBadgeDto {
  @ApiProperty({ description: 'Coloque o ID do seu usuário' })
  @IsNotEmpty()
  @IsInt()
  userId!: number;
}
