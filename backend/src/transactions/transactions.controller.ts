import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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