"use server";
import { auth } from "@/lib/auth";

export async function login(data: FormData) {
  void (await auth.authenticate({
    email: data.get("email") as string,
    password: data.get("password") as string,
  }));
}
