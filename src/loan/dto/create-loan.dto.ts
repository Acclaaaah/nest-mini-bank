 import { IsNotEmpty, IsNumber, Min } from 'class-validator';

    export class CreateLoanDto {
        @IsNumber()
        @IsNotEmpty()
        amount: number;

        @IsNumber()
        @IsNotEmpty()
        term: number;

        @IsNumber()
        @IsNotEmpty()
        @Min(0)
        interestRate: number;
    }