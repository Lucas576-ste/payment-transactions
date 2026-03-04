import * as bcrypt from 'bcrypt'; // importa o bcrypt para comparar as senhas
import { Injectable, UnauthorizedException } from '@nestjs/common'; // importa o NestJS para criar o serviço de autenticação
import { JwtService } from '@nestjs/jwt'; // importa o JwtService para criar o token de autenticação
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
