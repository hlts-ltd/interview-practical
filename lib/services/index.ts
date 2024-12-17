import { addSong, deleteSong, getSongs, updateSong, getSong } from "./songs";
import { deleteUser, getUsers, getUser, updateUser } from "./users";

export const service = {
  addSong,
  deleteSong,
  getSong,
  getSongs,
  updateSong,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} as const;
