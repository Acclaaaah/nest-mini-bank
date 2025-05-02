import { Controller, Post, Body, Get } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/withdrawal.dto';

@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Post()
  create(@Body() createWithdrawalDto: CreateWithdrawalDto) {
    return this.withdrawalsService.create(createWithdrawalDto);
  }

  @Get()
  findAll() {
    return this.withdrawalsService.findAll();
  }
}
