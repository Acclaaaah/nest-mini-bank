import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientFundsException extends HttpException {
  constructor() {
    super('Insufficient funds in the account.', HttpStatus.BAD_REQUEST);
  }
}
