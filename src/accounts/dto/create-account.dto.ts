import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  accountType!: 'checking' | 'savings';

  @ApiProperty({ default: 0 })
  balance!: number;

  @ApiProperty()
  userId!: number; 
}
