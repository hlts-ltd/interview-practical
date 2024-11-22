import { Table, TableBase } from "./table";

/**
 * Creating new JSON file for User Music
 *
 */
export interface Music extends TableBase {
  musicName?: string;
  userId?: string;
  file?: string;
}

export const musics = new Table<Music>([], { name: "musics" });
