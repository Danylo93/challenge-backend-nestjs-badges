// src/badge/badges.service.ts

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Badge } from '@prisma/client';

@Injectable()
export class BadgesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Badge[]> {
    return this.prisma.badge.findMany();
  }

  async findBySlug(slug: string): Promise<Badge | null> {
    return this.prisma.badge.findUnique({ where: { slug } });
  }

  async create(data: {
    slug: string;
    name: string;
    image: string;
    description?: string;
  }): Promise<Badge> {
    return this.prisma.badge.create({
      data,
    });
  }

  async redeemBadge(userId: number, badgeSlug: string): Promise<any> {
    try {
      const badge = await this.prisma.badge.findUnique({
        where: { slug: badgeSlug },
      });

      if (!badge) {
        throw new NotFoundException('Emblema não existe');
      }

      const userBadge = await this.prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId,
            badgeId: badge.id,
          },
        },
      });

      if (userBadge) {
        throw new ConflictException(
          'Esse emblema já foi registrado por um usuário',
        );
      }

      await this.prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
        },
      });

      return { message: 'Emblema resgatado com sucesso' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to redeem badge');
    }
  }

  async findRedeemedBadgesByUser(userId: number): Promise<Badge[]> {
    try {
      const redeemedBadges = await this.prisma.userBadge.findMany({
        where: {
          userId,
        },
        include: {
          badge: true,
        },
      });

      if (redeemedBadges.length === 0) {
        throw new NotFoundException('Usuario sem emblemas registrados');
      }

      return redeemedBadges.map((ub) => ub.badge);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to retrieve redeemed badges',
      );
    }
  }
}
