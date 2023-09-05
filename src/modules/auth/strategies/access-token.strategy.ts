import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import EnvironmentVariables from 'src/common/interfaces/environmentVariables';
import * as dotenv from 'dotenv';
import { JwtPayloadType } from '../types';
import { Constants } from 'src/common/constants';

dotenv.config();

const { JWT_SECRET_ACCESS_TOKEN_KEY } = process.env as EnvironmentVariables;

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  Constants.JwtStrategyConstants.JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_ACCESS_TOKEN_KEY,
    });
  }

  async validate(
    payload: JwtPayloadType
  ): Promise<JwtPayloadType> {
    return payload;
  }
}
