// src/accounts/account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ITransaction } from 'src/entities';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountType: 'checking' | 'savings';

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => User, user => user.accounts)
  user: User;

  @OneToMany(() => Transaction, trans => trans.account)
  transactions: ITransaction[]
}
