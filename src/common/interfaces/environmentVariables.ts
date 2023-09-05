import { BooleanString } from '../enums';

export default interface EnvironmentVariables {
  readonly NODE_ENV?: string;
  readonly ENABLE_ALL_ORIGINS?: BooleanString | string;
  readonly PORT?: number;
  readonly MYSQL_ENABLED?: BooleanString | string;
  readonly MYSQL_HOST?: string;
  readonly MYSQL_PORT?: number;
  readonly MYSQL_USERNAME?: string;
  readonly MYSQL_DATABASE?: string;
  readonly MYSQL_PASSWORD?: string;
  readonly MONGO_URL?: string;
  readonly CRYPTO_ENCRYPTION_ALGORITHM?: string;
  readonly CRYPTO_DIGEST_METHOD?: 'base64' | 'base64url' | 'hex' | 'binary';
  readonly BCRYPT_SALT_ROUND?: number;
  readonly JWT_SECRET_ACCESS_TOKEN_KEY?: string;
  readonly JWT_SECRET_REFRESH_TOKEN_KEY?: string;
  readonly JWT_DEFAULT_EXPIRY_TIME?: number;
  readonly SENDGRID_SENDER_EMAIL?: string;
  readonly SENDGRID_API_KEY?: string;
  readonly SENDGRID_TEMPLATE_ID?: string;
  readonly OTP_LENGTH?: number;
  readonly CACHE_HOST?: string;
  readonly CACHE_PORT?: number;
  readonly CACHE_ISGLOBAL?: BooleanString | string;
  readonly CACHE_TTL?: number;
  readonly MQTT_HOST?: string;
  readonly MQTT_USERNAME?: string;
  readonly MQTT_PASSWORD?: string;
  readonly API_BASE?: string;
  readonly STRIPE_PUBLISHABLE_KEY?: string;
  readonly STRIPE_SECRET_KEY?: string;
  // Endpoint secret for webhook for local
  readonly STRIPE_ENDPOINT_SECRET_LOCAL?: string;
  readonly STRIPE_AUTOCONFRIMATION_REDIRECT?: string;
}
