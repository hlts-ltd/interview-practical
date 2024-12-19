import { z } from "zod";

// export enum Role {
//   "provider" = "provider",
//   "client" = "client",
// }
export enum UserStatus {
  "active" = "active",
  "inactive" = "inactive",
}

export const UserSchema = z.object({
  id: z.string(),

  name: z.string({}).trim().min(5),

  phone: z.string({}).trim().min(8),

  email: z.string({}).email().trim().or(z.literal("")).optional(),

  status: z.nativeEnum(UserStatus, {}),

  imageUrl: z.string().or(z.literal("")).optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});