/** Core dependencies */
import { NestFactory } from '@nestjs/core';

/** Local dependenices */
import { AppModule } from './app.module';

import EnvironmentVariables from './common/interfaces/environmentVariables';

import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AllExceptionsFilter } from 'src/common/filters';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { swaggerConfig } from './config'

const {
  SWAGGER_API_VERSION,
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
  SWAGGER_BEARER_AUTH_IN,
  SWAGGER_BEARER_AUTH_NAME,
} = swaggerConfig;

async function bootstrap(): Promise<
  import('http').Server
  | import('https').Server
> {
  dotenv.config();
  /** Setting up environment from env files if it exists */

  /** Configurations and declarations */

  const {
    PORT,
    API_BASE,
    ENABLE_ALL_ORIGINS = 'true',
  } = process.env as EnvironmentVariables;
  const ENABLE_ALL_ORIGINS_BOOL = JSON.parse(ENABLE_ALL_ORIGINS as string);

  /** Configuring runtime and bootstrapping */
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    //* User for fastify integration
    // new FastifyAdapter(),
    // {
    //   logger: ['error', 'debug', 'verbose'],
    // },
  );
  app.setGlobalPrefix(API_BASE);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  if (ENABLE_ALL_ORIGINS_BOOL) {
    app.enableCors();
  }

  const swaggerPath = `/api/docs`;

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_API_VERSION)
    .addBearerAuth({
      in: SWAGGER_BEARER_AUTH_IN,
      type: 'http',
      name: SWAGGER_BEARER_AUTH_NAME,
    })
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [
            `'self'`,
            'sandbox.embed.apollographql.com',
            'https://js.stripe.com/',
          ],
        },
      },
    })
  );

  return await app.listen(PORT);
}

bootstrap();
