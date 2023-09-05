import { HttpException } from '@nestjs/common';

import { HttpStatus } from 'src/common/enums';

export class TooManyRequestsException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(...args: unknown[]) {
    super('TooManyRequests', HttpStatus.TOO_MANY_REQUESTS);
  }
}
