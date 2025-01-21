"use server";

import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas/users/auth";
import { actionClient } from "../action-client";
import { prisma } from "@dmu/prisma";
import { messages } from "@/lib/messages";
import { signIn } from "@/auth";
import { comparePassword } from "@dmu/features/auth";

export const loginAction = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.passwordHash) {
        return {
          success: false,
          message: messages.errors.auth.invalidCredentials,
        };
      }

      const {passwordHash, ...userWithoutPassword} = user

      const compare = await comparePassword(password, passwordHash);

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
        user: userWithoutPassword,
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
              message: messages.errors.common.unxpectedError,
            };
        }
      }

      return {
        success: false,
        message: messages.errors.common.unxpectedError,
      };
    }
  });
