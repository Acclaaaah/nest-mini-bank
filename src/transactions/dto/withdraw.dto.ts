import { IsNumber, IsPositive } from 'class-validator';

export class WithdrawDto {
  @IsNumber()
  accountId: number;

  @IsPositive()
  amount: number;
}
