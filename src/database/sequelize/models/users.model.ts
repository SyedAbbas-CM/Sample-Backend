/** Third part dependencies */
import { Model, Table } from 'sequelize-typescript';

/** Local dependencies */
import { UserType } from '../../../modules/users/types';

@Table
export class User extends Model {
  // pseudoname for guest or chosen username
  username: string;

  firstName?: string;

  lastName?: string;

  deleted: boolean;

  isInactive?: boolean;

  // email for user
  email?: string;

  // password if set up
  password?: string;

  phone_number?: string;

  instance: UserType | undefined;

  constructor() {
    super();

    this.instance = this.toJSON() as UserType;
  }
}
