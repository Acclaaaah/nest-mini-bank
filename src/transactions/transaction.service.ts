import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { DepositDto } from './dto/deposit.dto';
import { Account } from '../accounts/account.entity';
import { InsufficientFundsException } from './exceptions/insufficient-funds.exception'; 

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,

    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  async deposit(depositDto: DepositDto) {
    const { accountId, amount } = depositDto;

    const account = await this.accountRepo.findOne({ where: { id: accountId } });
    if (!account) {
      throw new Error('Account not found');
    }

    // Update account balance
    account.balance = Number(account.balance) + Number(amount);
    await this.accountRepo.save(account);

    // Log the transaction
    const transaction = this.transactionRepo.create({
      account,
      type: 'deposit',
      amount,
    });

    return this.transactionRepo.save(transaction);
  }

  async withdraw(accountId: number, amount: number) {
    const account = await this.accountRepo.findOne({ where: { id: accountId } });
    if (!account) {
      throw new Error('Account not found');
    }

    // 💥 Insufficient funds check
    if (Number(account.balance) < Number(amount)) {
      throw new InsufficientFundsException();
    }

    // Deduct balance
    account.balance = Number(account.balance) - Number(amount);
    await this.accountRepo.save(account);

    // Log the transaction
    const transaction = this.transactionRepo.create({
      account,
      type: 'withdrawal',
      amount,
    });

    return this.transactionRepo.save(transaction);
  }
}
