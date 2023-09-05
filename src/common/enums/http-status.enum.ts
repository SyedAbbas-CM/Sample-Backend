import { HttpStatus as CoreHttpStatus } from '@nestjs/common';

enum HttpStatusNew {
  RESOURCE_LOCKED = 423,
  TOO_MANY_REQUESTS = 429,
}

export const HttpStatus = { ...HttpStatusNew, ...CoreHttpStatus };
export type HttpStatus = typeof HttpStatus;
