// src/badge/badge.controller.ts
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
} from '@nestjs/common';
import { BadgesService } from './badge.service';
import { Badge } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('badges')
export class BadgeController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get()
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
  async create(
    @Body()
    createBadgeDto: {
      slug: string;
      name: string;
      image: string;
    },
  ) {
    return this.badgesService.create(createBadgeDto);
  }

  @UseGuards(JwtAuthGuard) 
  @Post('redeem/:slug')
  async redeemBadge(
    @Param('slug') slug: string,
    @Body('userId') userId: number,
  ): Promise<any> {
    return this.badgesService.redeemBadge(userId, slug);
  }

  @Get('redeemed/:userId')
  async findRedeemedBadgesByUser(
    @Param('userId') userId: number,
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
