import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CacheService } from 'src/modules/cache/cache.service';
import { Constants } from '../constants';
import { TooManyRequestsException } from '../exceptions';

@Injectable()
export class UserLockInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { username } = request.body;

    const lockKey = `lock:${username}`;
    const isLock = await this.cacheService.get(lockKey);

    if (isLock) {
      throw new TooManyRequestsException(Constants.ErrorMessages.LOCKED_ACCOUNT);
    }

    return next.handle();
  }
}
