import { HttpException } from "@nestjs/common";

import { HttpStatus } from 'src/common/enums';


export class ResourceLockedException extends HttpException {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(...args: unknown[]) {
        super('ResourceLocked', HttpStatus.RESOURCE_LOCKED);
    }
}