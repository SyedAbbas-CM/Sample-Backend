/** Core dependencies */
import { Injectable, NestMiddleware } from '@nestjs/common';

/** Third party dependencies */
import morgan from 'morgan';

@Injectable()
export class MorganLoggerMiddleware implements NestMiddleware {
  use = morgan('dev');
}
