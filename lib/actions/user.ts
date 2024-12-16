"use server";

import { db } from "@/database";
import { and, eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { getCurrentUser } from "../data/auth";
import { currentUser } from "@clerk/nextjs/server";
import { UserValidator, UserSchema } from "../validators/user";
import { revalidatePath } from "next/cache";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { status: 401, error: "Unauthorized, Youn need to sign in!" };
    }

    const dbUser = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.clerkId, user.id))
      .then((res) => res[0]);

    if (dbUser) {
      return { status: 200, user: dbUser };
    }

    const newUser = await db
      .insert(users)
      .values({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName || user.username || "Unknown",
        lastName: user.lastName || "Unknown",
        image: user.imageUrl,
        bio: "Hello Everyone!",
      })
      .returning({ id: users.id })
      .then((res) => res[0]);

    return { status: 201, user: newUser };
  } catch (err) {
    console.error("OnBoard User", err);

    return {
      status: 500,
      error: "Something went wrong! Internal server error.",
    };
  }
};

export const updateUserProfile = async (values: UserValidator) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { status: 401, error: "Unauthorized, Youn need to sign in!" };
    }

    const validatedFields = UserSchema.safeParse(values);

    if (!validatedFields.success) {
      return { status: 400, error: "Invalid fields!" };
    }

    await db
      .update(users)
      .set({ ...values })
      .where(and(eq(users.id, user.id), eq(users.clerkId, user.clerkId)));

    revalidatePath(`/users/${user.id}`);

    return { status: 200, message: "User has been updated" };
  } catch (err) {
    console.error("Update User", err);

    return {
      status: 500,
      error: "Something went wrong! Internal server error.",
    };
  }
};
