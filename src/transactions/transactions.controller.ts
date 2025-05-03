import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransferDto, FilterTransactionsDto } from './dto/create-transaction.dto'; 
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/entities';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}
  @ApiBearerAuth()
  @Roles(Role.User)
  @Post('transfer')
  transfer(@Body() transferDto: TransferDto) {
    return this.service.transferFunds(transferDto);
  }

  @Get(':accountId/history')
  getHistory(
    @Param('accountId') accountId: string,
    @Query() filterDto: FilterTransactionsDto, 
  ) {
    return this.service.getTransactionHistory(accountId, filterDto);
  }

  @Get(':accountId/report')
  getReport(@Param('accountId') accountId: string) {
    return this.service.generateReport(accountId);
  }
}
