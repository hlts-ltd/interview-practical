// this should be a server component so we can get the users data from the db;

import { NavBar } from "./NavBar";
import { prisma } from '@/database/prisma';
import { auth } from '@/lib/auth';
import { getAuth } from "@/lib/auth/cookie";


export const HeaderBar = async () => {
  const { user } = await getAuth();

  return (
    <NavBar user={user}/>
  )
}
