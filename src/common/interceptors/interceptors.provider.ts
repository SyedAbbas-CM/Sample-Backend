import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformInterceptor } from './response-transform.interceptor';

export const ResponseInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ResponseTransformInterceptor,
};
