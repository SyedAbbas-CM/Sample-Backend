// This should be a real class/interface representing a user entity
export type UserType = {
  _id?: string;
  username: string;

  password?: string;

  email: string;

  phone_number?: string;

  last_name?: string;

  first_name?: string;

  is_guest?: boolean;

  hashed_refreshtoken?: string;

  deleted?: boolean;

  roles?: string[];

  is_verified?: boolean;

  deleted_at?: Date;
};
