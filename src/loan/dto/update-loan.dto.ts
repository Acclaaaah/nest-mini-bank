import { IsOptional, IsEnum } from 'class-validator';

    export class UpdateLoanDto {
        @IsOptional()
        @IsEnum(['pending', 'approved', 'rejected', 'active', 'completed', 'defaulted'])
        status?: string;

        @IsOptional()
        approvalDate?: Date;
    }