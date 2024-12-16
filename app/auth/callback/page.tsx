import { redirect } from "next/navigation";
import { onBoardUser } from "@/lib/actions/user";

export default async function Callback() {
  const auth = await onBoardUser();

  if (auth.status === 201 || auth.status === 200) {
    return redirect("/");
  }

  return redirect("/auth/sign-in");
}
