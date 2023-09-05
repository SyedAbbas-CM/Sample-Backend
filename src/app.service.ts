/** Core dependencies */
import { Injectable } from '@nestjs/common';

/** Third party dependencis */

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
