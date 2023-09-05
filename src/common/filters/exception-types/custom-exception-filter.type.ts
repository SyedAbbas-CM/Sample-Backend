import { InternalServerErrorException } from "@nestjs/common";
import { MongooseError } from "mongoose";

export type CustomExceptionType = InternalServerErrorException & {
    type: string;
};

export type CustomMongooseErrorType = InternalServerErrorException & MongooseError & {
    code: number;
    keyPattern: string;
    message: string;
};

export type CustomExceptionReturnType = {
    data: string | string[] | Partial<object>[],
    message: string,
    /**
     * @note  Default status is either the exception retrieved status code, otherwise INTERNAL_SERVER_ERROR if not present
     */
    statusCode: number,
};
