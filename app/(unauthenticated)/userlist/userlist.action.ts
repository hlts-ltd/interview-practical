"use server";
import { User } from "@/database";
import { userdata } from "@/lib/user";

export async function userlist() {
  const userlist: User[] = await userdata.userlist();
  return userlist;
}

export async function finduserbyname(name: string) {
  const userbyname = await userdata.finduserbyname(name);
  return userbyname;
}
