import { ChairStates } from 'src/common/enums';

export type ChairType = {
  id: string;

  battery: number;

  state: ChairStates;

  qr_code: string;
};
