"use server";

import { db } from "@/database";
import { and, eq } from "drizzle-orm";
import { songs } from "@/database/schema";
import { getCurrentUser } from "../data/auth";
import { revalidatePath } from "next/cache";
import { SongSchema, SongValidator } from "../validators/song";

export const createSong = async (values: SongValidator) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { status: 401, error: "Unauthorized, Youn need to sign in!" };
    }

    const validatedFields = SongSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: 400, error: "Invalid fields!" };
    }

    await db.insert(songs).values({
      userId: user.id,
      ...values,
    });

    revalidatePath(`/users/${user.id}`);

    return { status: 201, message: "New song created" };
  } catch (err) {
    console.error("Create Song", err);

    return {
      status: 500,
      error: "Something went wrong! Internal server error.",
    };
  }
};

export const updateSong = async ({
  songId,
  values,
}: {
  songId: number;
  values: SongValidator;
}) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { status: 401, error: "Unauthorized, Youn need to sign in!" };
    }

    const validatedFields = SongSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: 400, error: "Invalid fields!" };
    }

    await db
      .update(songs)
      .set({ ...values })
      .where(and(eq(songs.userId, user.id), eq(songs.id, songId)));

    revalidatePath(`/users/${user.id}`);

    return { status: 200, message: "Song Updated" };
  } catch (err) {
    console.error("Update Song", err);

    return {
      status: 500,
      error: "Something went wrong! Internal server error.",
    };
  }
};

export const deleteSong = async (songId: number) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { status: 401, error: "Unauthorized, Youn need to sign in!" };
    }

    await db
      .delete(songs)
      .where(and(eq(songs.id, songId), eq(songs.userId, user.id)));

    revalidatePath(`/users/${user.id}`);

    return { status: 200, message: "Song Deleted" };
  } catch (err) {
    console.error("Delete Song", err);

    return {
      status: 500,
      error: "Something went wrong! Internal server error.",
    };
  }
};
