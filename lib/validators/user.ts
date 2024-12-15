import { z } from "zod";

export const UserSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required." }),
  lastName: z.string().min(1, { message: "Lastname is required." }),
  bio: z.string().optional(),
});

export type UserValidator = z.infer<typeof UserSchema>;
