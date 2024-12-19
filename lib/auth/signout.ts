
import { redirect } from "next/navigation";
import { getAuth, deleteSessionCookie } from "@/lib/auth/cookie";
import { invalidateSession } from "@/lib/auth/sessions";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect('/auth/login');
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect('/auth/login');
};