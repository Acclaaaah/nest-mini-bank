import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Withdrawal } from './withdrawal.entity';
import { CreateWithdrawalDto } from './dto/withdrawal.dto';
import { Account } from '../accounts/account.entity';

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepo: Repository<Withdrawal>,

    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  async create(createDto: CreateWithdrawalDto): Promise<Withdrawal> {
    const { accountId, amount } = createDto;
    
    const account = await this.accountRepo.findOne({ where: { id: accountId } });
    if (!account) throw new NotFoundException('Account not found');

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    account.balance -= amount;
    await this.accountRepo.save(account);

    const withdrawal = this.withdrawalRepo.create({
      amount,
      account,
    });

    return this.withdrawalRepo.save(withdrawal);
  }

  //  Get all withdrawals
  findAll() {
    return this.withdrawalRepo.find({ relations: ['account'] });
  }
}
