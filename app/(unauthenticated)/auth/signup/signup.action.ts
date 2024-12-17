"use server";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  biography: z.string(),
});

export const signup = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { email, firstName, lastName, biography, password },
    }) => {
      const user = auth.signup({
        email,
        firstName,
        lastName,
        biography,
        password,
      });

      if (user) {
        return {
          type: "success",
          message: "Successfully create user",
        };
      }

      return {
        type: "failure",
        message: "Something went wrong, please try again",
      };
    }
  );
