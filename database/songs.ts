import { Table, Row } from "./table";

export interface Song extends Row {
  title: string;
  artist: string;
  genre: string;
  rating: string;
  userId: string;
}

export const songs = new Table<Song>([], { name: "songs" });
