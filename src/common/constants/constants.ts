import { ErrorMessagesConstants } from './error-messages.constant';

export const Constants = {
  JwtStrategyConstants: {
    JWT: 'jwt',
    JWT_REFRESH: 'jwt-refresh',
  },
  MetaData: {
    PUBLIC: 'isPublic',
  },
  Roles: {
    ADMIN_USERS: ['superadmin', 'admin'],
    COMMON_USERS: ['user'],
  },
  ErrorMessages: {
    ...ErrorMessagesConstants,
  },
  OmitProperties: {
    PASSWORD: 'password',
  },
  SUCCESS_RESPONSE: 'success',
  ADMIN: 'admin',
  USER: 'user',
  EMAIL_SUBJECT: 'Verify Email Address',
  RESET_PASSWORD: 'Reset Your Password',
};
