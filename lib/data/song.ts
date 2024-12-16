"use server";

import { db } from "@/database";
import { desc, eq } from "drizzle-orm";
import { songs } from "@/database/schema";

export const getSongs = async (userId: number) => {
  const allSongs = await db
    .select()
    .from(songs)
    .where(eq(songs.userId, userId))
    .orderBy(desc(songs.createdAt));

  return allSongs;
};
