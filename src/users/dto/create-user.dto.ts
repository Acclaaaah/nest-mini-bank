import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

export class CreateUserDto {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty({ required: false, description: 'User first name' })
  firstName?: string;

  @ApiProperty({ required: false, description: 'User last name' })
  lastName?: string;

  @ApiProperty({ required: false, description: 'User address' })
  address?: string;

  @ApiProperty({ required: false, description: 'User phone number' })
  phoneNumber?: string;
}
