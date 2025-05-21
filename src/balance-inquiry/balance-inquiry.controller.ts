import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BalanceInquiryService } from './balance-inquiry.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Balance Inquiry')
@Controller('balance-inquiry')
export class BalanceInquiryController {
  constructor(private readonly balanceService: BalanceInquiryService) {}

  @Get(':accountId')
  @ApiOperation({ summary: 'Get balance for a specific account' })
  @ApiParam({ name: 'accountId', type: Number })
  getBalance(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.balanceService.getBalance(accountId);
  }
}