import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { ChairStates } from 'src/common/enums';
import { CreateChairDto } from './create-chair.dto';

export class UpdateChairStateDto extends PartialType(CreateChairDto) {
  @IsEnum(ChairStates)
  state: ChairStates;
  }
