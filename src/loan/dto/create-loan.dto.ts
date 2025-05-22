 import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

    export class CreateLoanDto {
        @IsNumber({ maxDecimalPlaces: 2 })
        @Min(100, { message: 'Minimum loan amount is ₱100' })
        amount: number;


        @IsNumber()
        @IsNotEmpty()
        term: number; //number of months.

        @IsNumber()
        @Min(0, { message: 'Interest rate must be at least 0%' })
        @Max(100, { message: 'Interest rate cannot exceed 100%' })
        interestRate: number;
    }