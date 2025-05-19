import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Account } from '../../accounts/account.entity'; 
import { ITransaction, TransactionType } from 'src/entities';
  

  
  @Entity()
  export class Transaction implements ITransaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Account, account => account.transactions)
    account: Account;
  
    @Column({
      type: 'enum',
      enum: TransactionType,
    })
    type: TransactionType;
  
    @Column('decimal')
    amount: number;
  
    @Column({ nullable: true })
    fromAccountId?: string;
  
    @Column({ nullable: true })
    toAccountId?: string;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  