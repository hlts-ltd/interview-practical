"use server";

import { db } from "@/database";
import { users } from "@/database/schema";
import { desc, eq, ilike, or } from "drizzle-orm";

export const getUsers = async (query?: string) => {
  let result;

  if (query) {
    result = await db
      .select()
      .from(users)
      .where(
        or(
          ilike(users.firstName, `%${query}%`),
          ilike(users.lastName, `%${query}%`),
          ilike(users.email, `%${query}%`)
        )
      )
      .orderBy(desc(users.createdAt));
  } else {
    result = await db.select().from(users).orderBy(desc(users.createdAt));
  }

  return result;
};

export const getUserById = async (id: number) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0]);

  return user;
};
