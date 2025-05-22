// src/balance-inquiry/balance-inquiry.module.ts
import { Module } from '@nestjs/common';
import { BalanceInquiryService } from './balance-inquiry.service';
import { BalanceInquiryController } from './balance-inquiry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../accounts/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [BalanceInquiryController],
  providers: [BalanceInquiryService],
})
export class BalanceInquiryModule {}
