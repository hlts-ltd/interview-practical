import { Table } from './table';

export interface User {
  bio?: string,
  email: string,
  id: string,
  name: string,
  password: string,
}

export const users = new Table<User>([], { name: 'users' });
