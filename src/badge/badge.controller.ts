import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { BadgesService } from './badge.service';
import { Badge } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { RedeemBadgeDto } from './dto/redeem-badge.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('badges')
@Controller('badges')
export class BadgeController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os emblemas' })
  @ApiResponse({
    status: 200,
    description: 'Recuperação bem-sucedida de emblemas',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
  ): Promise<Badge[]> {
    let badges = await this.badgesService.findAll();

    if (name) {
      badges = badges.filter((badge) => badge.name.includes(name));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return badges.slice(startIndex, endIndex);
  }

  @Post('create')
  @ApiOperation({ summary: 'Criar emblema' })
  @ApiResponse({ status: 201, description: 'Emblema criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgesService.create(createBadgeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('redeem/:slug')
  @ApiOperation({ summary: 'Resgatar Emblema' })
  @ApiResponse({ status: 200, description: 'Emblema resgatado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados Inválidos' })
  @ApiResponse({ status: 404, description: 'Emblema não existe' })
  @ApiResponse({
    status: 409,
    description: 'Emblema já registrado por outro usuário',
  })
  async redeemBadge(
    @Param('slug') slug: string,
    @Body() redeemBadgeDto: RedeemBadgeDto,
  ): Promise<any> {
    return this.badgesService.redeemBadge(redeemBadgeDto.userId, slug);
  }

  @Get('redeemed/:userId')
  @ApiOperation({ summary: 'Listar emblema de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Listar emblema de um usuário',
  })
  @ApiResponse({
    status: 404,
    description: 'O usuário não tem emblemas resgatados',
  })
  async getRedeemedBadgesByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Badge[]> {
    try {
      const badges = await this.badgesService.findRedeemedBadgesByUser(userId);
      return badges;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
