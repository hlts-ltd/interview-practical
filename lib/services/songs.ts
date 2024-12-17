import crypto from "node:crypto";
import { Song, songs } from "@/database";

export async function addSong(details: Omit<Song, "id">) {
  const song: Song = {
    ...details,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };

  songs.add(song);

  return song;
}

export async function getSong(id: string) {
  return songs.find((song: Song) => song.id === id);
}

export async function getSongs(userId: string) {

  return songs.findMany((song: Song) => {
    return song.userId === userId;
  });
}

export async function updateSong(details: Partial<Song>, id: string) {
  const song = songs.update(details, (row) => row.id === id);

  return song[0];
}

export async function deleteSong(id: string) {
  return songs.truncate((song: Song) => song.id === id);
}
