import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (userDataAttribute: string | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!userDataAttribute) return req.user;
    return req.user[userDataAttribute];
  },
);
