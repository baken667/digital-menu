"use server";
import { returnValidationErrors } from "next-safe-action";

import { db } from "@/lib/prisma/db";
import { Prisma } from "@dmu/prisma/client";
import { EstablishmentCreateSchema } from "../lib/schema";
import { messages } from "@/lib/messages";
import ActionAdminMiddleware from "@/lib/actions/middlewares/action-admin-middleware";
import actionClient from "@/lib/actions/action-client";

export const EstablishmentCreateAction = actionClient
  .schema(EstablishmentCreateSchema)
  .use(ActionAdminMiddleware)
  .action(async ({ parsedInput: { name, slug } }) => {
    try {
      const existEstablishment = await db.establishment.count({
        where: { slug },
      });

      if (existEstablishment > 0) {
        returnValidationErrors(EstablishmentCreateSchema, {
          slug: {
            _errors: [messages.validation.alreadyExists],
          },
        });
      }

      await db.establishment.create({
        data: {
          name,
          slug,
        },
      });

      return { success: true, message: messages.establishments.created };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          returnValidationErrors(EstablishmentCreateSchema, {
            slug: {
              _errors: [messages.validation.alreadyExists],
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
