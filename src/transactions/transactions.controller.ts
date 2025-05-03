// src/transactions/transactions.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { DepositDto } from './dto/deposit.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  deposit(@Body() depositDto: DepositDto) {
    return this.transactionsService.deposit(depositDto);
  }
}
