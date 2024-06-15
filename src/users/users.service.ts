// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}


  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(data: { username: string; password: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
  }
}
