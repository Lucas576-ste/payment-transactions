import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lê "Authorization: Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'chave-secreta-temporaria',
    });
  }

  // payload é o que você colocou no token: { sub, email }
  async validate(payload: { sub: string; email: string }) {
    // O objeto retornado aqui vai para request.user
    return { userId: payload.sub, email: payload.email };
  }
}