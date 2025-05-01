import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
  @ApiProperty({ required: false })
  accountType?: 'checking' | 'savings';

  @ApiProperty({ required: false })
  balance?: number;
}