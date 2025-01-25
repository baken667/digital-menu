"use server";

import { AuthError } from "next-auth";
import { comparePassword } from "@dmu/features/auth";

import { messages } from "@/lib/messages";
import { db } from "@/lib/prisma/db";
import { signIn } from "@/auth";
import ActionGuestMiddleware from "@/lib/actions/middlewares/action-guest-middleware";
import actionClient from "@/lib/actions/action-client";
import { AuthLoginSchema } from "../lib/schema";

export const authLoginAction = actionClient
  .schema(AuthLoginSchema)
  .use(ActionGuestMiddleware)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const user = await db.user.findUnique({
        where: { email },
        select: {
          id: true,
          passwordHash: true,
          invalidLoginAttempts: true,
          lockedAt: true,
        },
      });

      if (user?.lockedAt) {
        return {
          success: false,
          message: messages.errors.auth.locked,
        };
      }

      if (!user || !user.passwordHash) {
        return {
          success: false,
          message: messages.errors.auth.invalidCredentials,
        };
      }

      const compare = await comparePassword(password, user.passwordHash);

      if (!compare) {
        return {
          success: false,
          message: messages.errors.auth.invalidCredentials,
        };
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return {
        success: true,
        message: messages.auth.successfulLogin,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              success: false,
              message: messages.errors.auth.invalidCredentials,
            };
          default:
            return {
              success: false,
              message: messages.errors.common.unexpectedError,
            };
        }
      }

      return {
        success: false,
        message: messages.errors.common.unexpectedError,
      };
    }
  });
