import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;
}
