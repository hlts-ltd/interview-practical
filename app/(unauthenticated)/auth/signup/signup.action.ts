"use server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signup(data: FormData) {
  void (await auth.signup({
    email: data.get("email") as string,
    name: data.get("name") as string,
    password: data.get("password") as string,
  }));

  redirect("/auth/login");
}
