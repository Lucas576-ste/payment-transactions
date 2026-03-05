import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { PaymentTransaction } from './entities/payment-transaction.entity';

/** Formato esperado de um item retornado pela API externa de pagamentos */
interface ExternalPaymentItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

/** Mock para quando não houver URL de API configurada (desenvolvimento/demo) */
const MOCK_EXTERNAL_PAYMENTS: ExternalPaymentItem[] = [
  { id: 'pi_mock_001', amount: 2990, currency: 'brl', status: 'succeeded' },
  { id: 'pi_mock_002', amount: 15000, currency: 'brl', status: 'pending' },
  { id: 'pi_mock_003', amount: 5990, currency: 'brl', status: 'succeeded' },
];

@Injectable()
export class PaymentTransactionService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private readonly paymentRepository: Repository<PaymentTransaction>,
  ) {}

  /**
   * Busca pagamentos na API externa (ou retorna mock se EXTERNAL_PAYMENTS_API_URL não estiver definida).
   */
  async fetchFromExternal(): Promise<ExternalPaymentItem[]> {
    const apiUrl = process.env.EXTERNAL_PAYMENTS_API_URL;
    if (!apiUrl) {
      return MOCK_EXTERNAL_PAYMENTS;
    }
    const { data } = await axios.get<ExternalPaymentItem[]>(apiUrl);
    return Array.isArray(data) ? data : [];
  }

  /**
   * Mapeia um item da API externa para a entidade PaymentTransaction (sem id, createdAt, updatedAt).
   */
  private mapToEntity(item: ExternalPaymentItem): Partial<PaymentTransaction> {
    return {
      stripePaymentIntentId: item.id,
      amount: item.amount,
      currency: item.currency,
      status: item.status,
    };
  }

  /**
   * Persiste no PostgreSQL os itens vindos da API, evitando duplicar por stripePaymentIntentId.
   */
  async saveFromExternal(items: ExternalPaymentItem[]): Promise<PaymentTransaction[]> {
    const saved: PaymentTransaction[] = [];
    for (const item of items) {
      const existing = await this.paymentRepository.findOne({
        where: { stripePaymentIntentId: item.id },
      });
      if (existing) continue;
      const entity = this.paymentRepository.create(this.mapToEntity(item));
      saved.push(await this.paymentRepository.save(entity));
    }
    return saved;
  }

  /**
   * Sincroniza: busca na API externa, persiste no banco e retorna a listagem atual.
   */
  async sync(): Promise<PaymentTransaction[]> {
    const items = await this.fetchFromExternal();
    await this.saveFromExternal(items);
    return this.findAll();
  }

  /**
   * Lista todas as payment transactions já persistidas no PostgreSQL.
   */
  async findAll(): Promise<PaymentTransaction[]> {
    return this.paymentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
