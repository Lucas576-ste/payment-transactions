import * as bcrypt from 'bcrypt';
import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async hashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(name: string, email: string, password: string) {
        const existing = await this.userRepository.findOne({ where: { email } });
        if (existing) {
            throw new ConflictException('Email já cadastrado');
        }
        const hashedPassword = await this.hashPassword(password);
        const user = this.userRepository.create({ name, email, password: hashedPassword });
        return this.userRepository.save(user);
    }
}

