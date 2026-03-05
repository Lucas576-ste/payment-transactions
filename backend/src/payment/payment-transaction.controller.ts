import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentTransactionService } from './payment-transaction.service';

@Controller('payment-transactions')
@UseGuards(JwtAuthGuard)
export class PaymentTransactionController {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) {}

  /**
   * Lista as payment transactions já persistidas no banco (rota protegida por JWT).
   */
  @Get()
  findAll() {
    return this.paymentTransactionService.findAll();
  }

  /**
   * Sincroniza: chama a API externa, persiste os novos dados no PostgreSQL e retorna a listagem atual.
   */
  @Post('sync')
  sync() {
    return this.paymentTransactionService.sync();
  }
}
