import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  _id: string;
  email: string;
  name: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
