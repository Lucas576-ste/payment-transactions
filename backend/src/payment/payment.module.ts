import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionController } from './payment-transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentTransaction]),
    AuthModule,
  ],
  providers: [PaymentTransactionService],
  controllers: [PaymentTransactionController],
})
export class PaymentModule {}