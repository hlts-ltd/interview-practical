"use server";

import { cache } from "react";
import { db } from "@/database";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = cache(async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.id))
    .then((res) => res[0]);

  return dbUser;
});
