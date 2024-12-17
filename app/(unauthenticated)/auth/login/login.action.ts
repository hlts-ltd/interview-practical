'use server';
import { auth } from '@/lib/auth';
import { actionClient } from "@/lib/safe-action";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const login = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const { user } = await auth.authenticate({ email, password });
    if (user) {
      return {
        type: "success",
        message: "Login successfully",
      };
    }

    return {
      type: "failure",
      message: "Incorrect login details",
    };
  });
