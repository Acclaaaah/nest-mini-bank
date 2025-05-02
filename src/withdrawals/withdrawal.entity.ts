// src/withdrawals/withdrawal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  withdrawnAt: Date;

  @ManyToOne(() => Account, (account) => account.withdrawals)
  account: Account;
}
