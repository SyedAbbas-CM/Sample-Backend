/** Core depndencies */
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Public()
  @Get('health-check')
  @HttpCode(HttpStatus.OK)
  getHello(): string {
    return 'ok';
  }
}
