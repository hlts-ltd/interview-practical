import { Table, Row } from './table';

export interface User extends Row {
  bio?: string,
  email: string,
  name: string,
  password: string,
  profileImage?: string
  favoriteSongs: [],
}

export const users = new Table<User>([], { name: 'users' });
