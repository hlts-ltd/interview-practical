import {
  deletemusic,
  findmusicbyuser,
  updateusermusic,
  uploadmusic,
} from "./music";

export const musicdata = {
  uploadmusic,
  deletemusic,
  updateusermusic,
  findmusicbyuser,
} as const;
