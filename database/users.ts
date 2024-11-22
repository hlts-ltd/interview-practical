import { Table, TableBase } from "./table";

export interface User extends TableBase {
  bio?: string;
  email: string;
  name: string;
  password: string;
  phone?: string;
  profilePic?: string;
}

export const users = new Table<User>([], { name: "users" });
