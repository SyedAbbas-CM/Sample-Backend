import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enums';
import { RolesGuard } from '../guards';
import { AuthorizationDecoratorReturnType } from './types';

export const ROLES_KEY = 'roles';
export function Authorization(
  ...roles: Role[]
): AuthorizationDecoratorReturnType {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
}
