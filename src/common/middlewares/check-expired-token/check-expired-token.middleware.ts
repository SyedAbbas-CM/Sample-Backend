import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import {
  ExpiredToken,
  ExpiredTokenDocument,
} from 'src/database/mongoose/schemas/expired-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class CheckExpiredToken implements NestMiddleware {
  constructor(
    @InjectModel(ExpiredToken.name)
    private readonly expiredTokenModel: Model<ExpiredTokenDocument>,
  ) { }

  async use(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('Invalid or expired token');
    }

    const isExpiredToken = await this.expiredTokenModel.findOne({
      expired_token: token,
    });

    if (isExpiredToken)
      throw new ForbiddenException('Invalid or expired token');

    return next();
  }
}
