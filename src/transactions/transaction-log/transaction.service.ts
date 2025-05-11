import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { DepositDto } from 'src/transactions/dto/deposit.dto';
import { Account } from 'src/accounts/account.entity';
import { TransactionType } from 'src/transactions/dto/create-transaction.dto';

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
      throw new BadRequestException('Account not found');
    }

    account.balance = Number(account.balance) + Number(amount);
    await this.accountRepo.save(account);

    const transaction = this.transactionRepo.create({
      account,
      type: TransactionType.CREDIT,
      amount,
    });

    return this.transactionRepo.save(transaction);
  }

  async withdraw(depositDto: DepositDto) {
    const { accountId, amount } = depositDto;
    const account = await this.accountRepo.findOne({ where: { id: accountId } });

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    if (Number(account.balance) < Number(amount)) {
      throw new BadRequestException('Insufficient funds');
    }

    account.balance = Number(account.balance) - Number(amount);
    await this.accountRepo.save(account);

    const transaction = this.transactionRepo.create({
      account,
      type: TransactionType.DEBIT,
      amount,
    });

    return this.transactionRepo.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
