"use server";
import { musicdata } from "@/lib/music";
import { userdata } from "@/lib/user";

export async function findDetail(id: string) {
  const data = await userdata.finduserdetail(id);
  return data;
}

export async function getMusicByUser(id: string) {
  const data = await musicdata.findmusicbyuser(id);
  return data;
}
