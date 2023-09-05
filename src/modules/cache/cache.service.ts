import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as dotenv from 'dotenv';
import EnvironmentVariables from 'src/common/interfaces/environmentVariables';

dotenv.config();

const {
  // 300,000 milliseconds == 5 minutes
  CACHE_TTL = 300000
} = process.env as EnvironmentVariables;

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(
    key: string,
    value: unknown,
    ttl = Number(CACHE_TTL),
  ): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }


  /** Flushes / resets the cache */
  async flush(): Promise<void> {
    await this.cacheManager.reset();
  }
}
