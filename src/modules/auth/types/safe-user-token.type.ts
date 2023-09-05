import { UserSafeType } from 'src/modules/users/types/users-safe.type';
import { Tokens } from './tokens.type';

export type SafeUserTokenType = {
  user: UserSafeType;
  tokens: Tokens;
};
