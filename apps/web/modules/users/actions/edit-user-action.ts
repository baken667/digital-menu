"use server";
import { z } from "zod";
import { Prisma } from "@dmu/prisma/client";
import { messages } from "@/lib/messages";
import actionClient from "@/lib/actions/action-client";
import ActionAdminMiddleware from "@/lib/actions/middlewares/action-admin-middleware";
import { UserEditSchema } from "../lib/schema";
import { db } from "@/lib/prisma/db";

export const UserEditAction = actionClient
  .use(ActionAdminMiddleware)
  .schema(
    z.object({
      id: z.string(),
      data: UserEditSchema,
    }),
  )
  .action(async ({ parsedInput: { id, data }, ctx }) => {
    try {
      const existUser = await db.user.findUnique({
        where: { id },
      });

      if (!existUser) {
        throw new Error(messages.errors.users.notFound);
      }

      if (existUser.id === ctx.session.user.id) {
        throw new Error(messages.errors.common.forbidden);
      }

      const user = await db.user.update({
        where: { id },
        data,
      });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          success: false,
          message: messages.errors.common.databaseError,
        };
      }

      throw error;
    }
  });
