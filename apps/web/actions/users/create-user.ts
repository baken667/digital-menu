"use server";

import { returnValidationErrors } from "next-safe-action";
import { prisma } from "@dmu/prisma";
import { generateRandomPassword, hashPassword } from "@dmu/features/auth";
import { CreateUserSchema } from "@/schemas/users/create-user";
import { actionClient } from "../action-client";
import { messages } from "@/lib/messages";
import { Prisma } from "@prisma/client";
import { getResend } from "@/lib/resend";
import { DOMAIN, FROM_EMAIL } from "@/lib/consts";
import { NewAccountEmail } from "@/components/email/new-account-email";

export const createUserAction = actionClient
  .schema(CreateUserSchema)
  .action(async ({ parsedInput: { name, email, role } }) => {
    try {
      const existUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existUser) {
        returnValidationErrors(CreateUserSchema, {
          email: {
            _errors: [messages.errors.users.alreadyExists],
          },
        });
      }

      const password = generateRandomPassword();
      const hash = await hashPassword(password);

      const user = await prisma.user.create({
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
          returnValidationErrors(CreateUserSchema, {
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
