import { CacheService } from './cache.service';
import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import EnvironmentVariables from 'src/common/interfaces/environmentVariables';

dotenv.config();

const {
  CACHE_HOST,
  CACHE_ISGLOBAL = 'true',
  CACHE_PORT
} = process.env as EnvironmentVariables;

const CACHE_ISGLOBAL_BOOL = JSON.parse(CACHE_ISGLOBAL as string);
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: CACHE_HOST,
      port: +CACHE_PORT,
      isGlobal: CACHE_ISGLOBAL_BOOL,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class RedisCacheModule { }
