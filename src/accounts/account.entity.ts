import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accountType!: 'checking' | 'savings';

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance!: number;

  @ManyToOne(() => User, user => user.accounts)
  user!: User;
}
