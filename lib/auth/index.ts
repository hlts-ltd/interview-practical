import { authenticate } from "./authenticate";
import { logout } from "./logout";
import { session } from "./session";
import { signup } from "./signup";

export type * from "./auth.types";

export const auth = {
  authenticate,
  logout,
  session,
  signup,
} as const;
