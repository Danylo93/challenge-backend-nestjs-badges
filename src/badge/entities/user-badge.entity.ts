import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Badge } from './badge.entity';

@Entity()
export class UserBadge {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Badge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'badge_id' })
  badge!: Badge;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  redeemed_at!: Date;
}
