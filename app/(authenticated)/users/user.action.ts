"use server";
import { actionClient } from "@/lib/safe-action";
import { service } from "@/lib/services";
import fetch from "node-fetch";

import { z } from "zod";

const addSchema = z.object({
  userId: z.string(),
  title: z.string(),
  artist: z.string(),
  genre: z.string(),
  rating: z.string(),
});

const updateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  artist: z.string().optional(),
  genre: z.string().optional(),
  rating: z.string().optional(),
});

const id = z.string();

const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(3).max(10),
  lastName: z.string().min(3).max(10),
  biography: z.string().min(3).max(200),
});

export const addFavoriteSong = actionClient
  .schema(addSchema)
  .action(async ({ parsedInput: { artist, genre, rating, title, userId } }) => {
    const song = await service.addSong({
      artist,
      genre,
      rating,
      title,
      userId,
    });
    if (song) {
      return {
        type: "success",
        message: "Added favorite song successfully",
      };
    }

    return {
      type: "failure",
      message: "Something went wrong, please try again...",
    };
  });

export const updateFavoriteSong = actionClient
  .schema(updateSchema)
  .action(async ({ parsedInput: { artist, genre, rating, title, id } }) => {
    const song = await service.updateSong(
      {
        artist,
        genre,
        rating,
        title,
      },
      id
    );
    if (song) {
      return {
        type: "success",
        message: "Updated favorite song successfully",
      };
    }

    return {
      type: "failure",
      message: "Something went wrong, please try again...",
    };
  });

export const deleteSong = actionClient
  .schema(id)
  .action(async ({ parsedInput: id }) => {
    const song = await service.deleteSong(id);

    if (song) {
      return {
        type: "success",
        message: "Deleted successfully",
      };
    }

    return {
      type: "failure",
      message: "Something went wrong, please try again...",
    };
  });

export const updateUser = actionClient
  .schema(userSchema)
  .action(async ({ parsedInput: { firstName, lastName, biography, id } }) => {

    const user = service.updateUser(
      {
        firstName,
        lastName,
        biography,
      },
      id
    );

    if (!user) {
      return {
        type: "failure",
        message: "Something went wrong, please try again",
      };
    }

    return {
      type: "success",
      message: "Successfully updated user",
    };
  });

export const downloadSong = actionClient
  .schema(id)
  .action(async ({ parsedInput: id }) => {
    const song = await service.getSong(id);

    if (!song) {
      console.error("Song not found");
      return;
    }

    const blob = new Blob([JSON.stringify(song)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    return url;
  });
