import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  type!: 'DEBIT' | 'CREDIT';

  @ApiProperty()
  amount: number;

  @ApiProperty()
  accountId: string;
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class TransferDto {
  @ApiProperty()
  fromAccountId: string;

  @ApiProperty()
  toAccountId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: TransactionType;
}

export class FilterTransactionsDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
