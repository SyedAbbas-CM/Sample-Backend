export const ErrorMessagesConstants = {
  ACCESS_DENIED: 'Access Denied',
  USER_USERNAME_ALREADY_EXIST: 'User with this username already exists',
  ADMIN_USERNAME_ALREADY_EXIST: 'Admin with this username already exists',
  INVALID_EMAIL: 'Invalid email address',
  OTP_EXPIRED: 'OTP Expired',
  INCORRECT_OTP: 'Incorrect OTP provided. Please input correct OTP.',
  INVALID_USERNAME_PASSWORD: 'Invalid username or password',
  NO_USER_FOUND: 'No user found.',
  CHAIR_UPDATE_DENIED: 'This action can`t be performed for this chair state',
  EMAIL_NOT_FOUND: 'Email not found',
  PAYMENT_ALREADY_INPROGRESS: 'Payment already in progress, please wait 5 minutes before continuing',
  ROLE_ERROR: 'Roles must be valid.',
  MIN_ROLE_ERROR: 'Must have at least one role.',
  PAYMENT_METHOD_NOT_SETUP: 'The payment method is unavailable or not available, kindly contact support',
  LOCKED_ACCOUNT: 'Too many failed login attempts your account is locked for 2 minutes',
  STRIPE_CUSTOMER_ALREADY_EXISTS: 'Stripe customer already exists',
  STRIPE_CUSTOMER_NOT_REGISTERED: 'Stripe customer not registered',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  STRIPE_ID_CUSTOMER_ID_MISMATCH: 'Customer Id & Provided Stripe customer Id did not match',
};