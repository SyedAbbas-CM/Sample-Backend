import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { MongoErrors } from 'src/common/enums';
import { CustomExceptionType, CustomExceptionReturnType, CustomMongooseErrorType } from '../exception-types';

/**
 * Using dry-kiss for switching between handlers
 */
const codeKeyMaps = {
  Mongo: {
    '11000': {
      key: 'DuplicateKey',
      statusCode: HttpStatus.CONFLICT,
    },
  }
};

const handlerMethods = {
  StripeInvalidRequestError: function (
    exception
  ): CustomExceptionReturnType {
    const {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      type: data = 'Error',
    } = exception as {
      statusCode: number;
      type: string;
      message: string;
    };

    const toReturn = {
      data,
      message,
      /**
       * @note  Default status is either the exception retrieved status code, otherwise INTERNAL_SERVER_ERROR if not present
       */
      statusCode,
    };

    return toReturn;
  },
  MongoServerError: function (
    exception: CustomMongooseErrorType,
  ): CustomExceptionReturnType {
    const { code, keyPattern, message } = exception as {
      code: number;
      keyPattern: string;
      message: string;
    };

    const toReturn = {
      data: 'Error',
      message,
      /**
       * @note  Default status is either the exception retrieved status code, otherwise INTERNAL_SERVER_ERROR if not present
       */
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    const errorObject = codeKeyMaps.Mongo[code.toString()];

    if (!errorObject) return toReturn;

    const { key: errorKey, statusCode } = errorObject;

    Object.assign(toReturn, {
      message: MongoErrors[errorKey],
      statusCode,
      data: Object.keys(keyPattern).pop(),
    });

    return toReturn;
  },
  default: function (
    exception
  ): CustomExceptionReturnType {
    const {
      message,
      response: {
        message: responseMessage
      } = {}
    } = exception as {
      message: string,
      response?: {
        statusCode: number,
        message: Array<string>,
        error: string,
      }
    };

    return {
      data: 'Error',
      message: (responseMessage || message) as string,
      /**
       * @note  Default status is either the exception retrieved status code, otherwise INTERNAL_SERVER_ERROR if not present
       */
      statusCode: exception.status || exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR,
    };
  },
};




@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: CustomExceptionType, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log(exception);

    const useException = handlerMethods[exception.name] || handlerMethods[exception.type]

    const useResponse = useException
      ? useException(exception)
      : handlerMethods.default(exception);

    const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR } = useResponse;

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    response.status(statusCode).json({
      ...useResponse,
      statusCode,
    });
  }
}
