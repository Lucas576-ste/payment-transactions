import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() body: { amount: number; description: string }) {
    return this.transactionsService.create(body.amount, body.description);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
}