'use server';
import { z } from "zod";
import { prisma } from "@dmu/prisma";
import { Prisma } from "@dmu/prisma/client";
import { EditUserSchema } from "@/schemas/users/edit-user";
import { actionClient } from "../action-client";
import { adminMiddleware } from "../middleware/admin-middleware";
import { messages } from "@/lib/messages";

export const editUserAction = actionClient
  .schema(
    z.object({
      id: z.string(),
      data: EditUserSchema,
    })
  )
  .use(adminMiddleware)
  .action(async ({ parsedInput: { id, data }, ctx }) => {
    try {
      const existUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existUser) {
        throw new Error(messages.errors.users.notFound);
      }

      if (existUser.id === ctx.session.user.id) {
        throw new Error(messages.errors.common.forbidden);
      }

      const user = await prisma.user.update({
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
