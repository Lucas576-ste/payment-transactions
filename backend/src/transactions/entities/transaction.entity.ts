import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column({
    default: 'pending',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}