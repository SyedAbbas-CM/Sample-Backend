import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import EnvironmentVariables from 'src/common/interfaces/environmentVariables';
import { JwtPayloadType } from '../types';
import { Constants } from 'src/common/constants';

dotenv.config();

const { JWT_SECRET_REFRESH_TOKEN_KEY } = process.env as EnvironmentVariables;
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  Constants.JwtStrategyConstants.JWT_REFRESH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: JWT_SECRET_REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    payload: JwtPayloadType
  ): Promise<JwtPayloadType & { refreshToken: string | string[] }> {
    const refreshToken = req.headers['x-refresh-token'];
    return { ...payload, refreshToken };
  }
}
