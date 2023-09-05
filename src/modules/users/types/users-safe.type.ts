import { UserType } from './users.type';

type fieldsToOmit = 'password';

export type UserSafeType = Omit<UserType, fieldsToOmit>;
