import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(amount: number, description: string) {
    const transaction = this.transactionRepository.create({
      amount,
      description,
      status: 'pending',
    });

    return this.transactionRepository.save(transaction);
  }

  async findAll() {
    return this.transactionRepository.find();
  }
}