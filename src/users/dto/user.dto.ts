import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    password: string;
    @ApiProperty({
        nullable: true
    })
    firstName?: string;
    @ApiProperty({
        nullable: true
    })
    lastName?:string;
}
