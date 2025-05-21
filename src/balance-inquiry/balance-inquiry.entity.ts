import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class BalanceInquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  account: Account;

  @CreateDateColumn()
  inquiredAt: Date;
}