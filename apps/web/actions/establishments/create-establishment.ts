"use server";

import { prisma } from "@dmu/prisma";
import { CreateEstablishmentSchema } from "@/schemas/establishments/create-establishment";
import { actionClient } from "../action-client";
import { returnValidationErrors } from "next-safe-action";
import { messages } from "@/lib/messages";
import { Prisma } from "@prisma/client";
import { adminMiddleware } from "../middleware/admin-middleware";

export const createEstablishmentAction = actionClient
  .schema(CreateEstablishmentSchema)
  .use(adminMiddleware)
  .action(async ({ parsedInput: { name, slug } }) => {
    try {
      const existEstablishment = await prisma.establishment.findUnique({
        where: { slug },
      });

      if (existEstablishment) {
        returnValidationErrors(CreateEstablishmentSchema, {
          slug: {
            _errors: [messages.validation.alreadyExists],
          },
        });
      }

      await prisma.establishment.create({
        data: {
          name,
          slug,
        },
      });

      return { success: true, message: messages.establishments.created };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          returnValidationErrors(CreateEstablishmentSchema, {
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
