import { capitalize } from 'src/utilities';
import * as packageContents from '../../package.json';


/**
 * Sample config
 * 
 * SWAGGER_TITLE=Green Fox Api
 * SWAGGER_DESCRIPTION=Apis to access green fox project
 * SWAGGER_API_VERSION=1.0
 * SWAGGER_BEARER_AUTH_IN=in
 * SWAGGER_BEARER_AUTH_NAME=Authorization
 */
export const swaggerConfig = {
    SWAGGER_TITLE: packageContents.name
        .split('-')
        .map(word => capitalize(word))
        .join(' '),
    SWAGGER_DESCRIPTION: packageContents.description,
    SWAGGER_API_VERSION: packageContents.version,
    SWAGGER_BEARER_AUTH_IN: 'in',
    SWAGGER_BEARER_AUTH_NAME: 'Authorization',
}