import { z } from "zod";

export const SongSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  artist: z.string().min(1, { message: "Artist is required." }),
  genre: z.string().min(1, { message: "Genre is required." }),
  rating: z.coerce.number().min(0).max(5).default(0),
});

export type SongValidator = z.infer<typeof SongSchema>;
