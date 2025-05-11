import { ApiProperty } from "@nestjs/swagger";

export class CreateWithdrawalDto {
  // @IsNumber()
  @ApiProperty()
  accountId: number;
  
  // @IsNumber()
  // @Min(0.01)
  @ApiProperty()
  amount: number;
}
