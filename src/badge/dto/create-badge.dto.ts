// src/badge/dto/create-badge.dto.ts
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBadgeDto {
  @ApiProperty({ description: 'Coloque o nome do slug' })
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ description: 'Coloque o nome do emblema' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Insira a url do emblema' })
  @IsNotEmpty()
  image!: string;
}
