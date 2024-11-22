"use server";
import { Music, User } from "@/database";
import { musicdata } from "@/lib/music";
import { userdata } from "@/lib/user";

export async function updatedetail(detail: User) {
  const userlist = await userdata.updateuserdetail(detail);
  return userlist;
}

export async function findDetail(id: string) {
  const data = await userdata.finduserdetail(id);
  return data;
}

export async function uploadMusic(detail: Music) {
  void (await musicdata.uploadmusic(detail));
}

export async function updateUserMusic(detail: Music) {
  const musiclist = await musicdata.updateusermusic(detail);
  return musiclist;
}

export async function getUserMusic(id: string) {
  const data = await musicdata.findmusicbyuser(id);
  return data;
}

export async function deleteMusic(id: string) {
  void (await musicdata.deletemusic(id));
}
