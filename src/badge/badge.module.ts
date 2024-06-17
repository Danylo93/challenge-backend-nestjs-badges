import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgesService } from './badge.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [BadgeController],
  providers: [BadgesService, PrismaService],
})
export class BadgeModule {}
