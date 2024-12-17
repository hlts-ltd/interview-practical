import { Table, Row } from './table';

export interface User extends Row {
  email: string;
  firstName: string;
  lastName: string;
  biography: string;
  password: string;
}

export const users = new Table<User>([], { name: 'users' });
