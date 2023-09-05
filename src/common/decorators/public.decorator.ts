import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Constants } from '../constants';

export const Public = (): CustomDecorator<string> => SetMetadata(Constants.MetaData.PUBLIC, true);
