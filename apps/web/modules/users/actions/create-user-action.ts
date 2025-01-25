"use server";

import { returnValidationErrors } from "next-safe-action";
import { Prisma } from "@dmu/prisma/client";
import { generateRandomPassword, hashPassword } from "@dmu/features/auth";
import { messages } from "@/lib/messages";
import { getResend } from "@/lib/resend";
import { DOMAIN, FROM_EMAIL } from "@/lib/consts";
import { NewAccountEmail } from "@/modules/email/new-account-email";
import actionClient from "@/lib/actions/action-client";
import ActionAdminMiddleware from "@/lib/actions/middlewares/action-admin-middleware";
import { db } from "@/lib/prisma/db";
import { UserCreateSchema } from "../lib/schema";

export const UsersCreateAction = actionClient
  .schema(UserCreateSchema)
  .use(ActionAdminMiddleware)
  .action(async ({ parsedInput: { name, email, role } }) => {
    try {
      const existUser = await db.user.findUnique({
        where: { email },
      });

      if (existUser) {
        returnValidationErrors(UserCreateSchema, {
          email: {
            _errors: [messages.errors.users.alreadyExists],
          },
        });
      }

      const password = generateRandomPassword();
      const hash = await hashPassword(password);

      const user = await db.user.create({
        data: {
          name,
          email,
          passwordHash: hash,
          role,
        },
      });

      const loginUrl = new URL("/login", DOMAIN);

      await getResend().emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: messages.auth.yourAccountCreated,
        react: NewAccountEmail({
          name,
          email,
          password,
          url: loginUrl.toString(),
        }),
      });

      return {
        success: true,
        message: messages.users.created,
        data: user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          returnValidationErrors(UserCreateSchema, {
            _errors: [messages.errors.users.alreadyExists],
            email: {
              _errors: [messages.errors.users.alreadyExists],
            },
          });
        }

        return {
          success: false,
          message: messages.errors.common.databaseError,
        };
      }

      throw error;
    }
  });
