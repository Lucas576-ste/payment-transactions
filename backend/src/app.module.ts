import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from './payment/entities/payment-transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import {UsersModule} from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'payment_transaction',
      autoLoadEntities: true,
      synchronize: true,
      entities: [PaymentTransaction, User],
      
      
    }),
    TransactionsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
