import { PartialType } from '@nestjs/mapped-types';
import { CreateChairDto } from './create-chair.dto';

export class UpdateChairDto extends PartialType(CreateChairDto) {}
