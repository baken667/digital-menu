"use server";
import { z } from "zod";

import actionClient from "@/lib/actions/action-client";
import { Prisma } from "@dmu/prisma/client";
import { EstablishmentUploadLogoSchema } from "../lib/schema";
import { messages } from "@/lib/messages";
import { db } from "@/lib/prisma/db";
import { removeImage, uploadImage } from "@/lib/storage";
import ActionAuthMiddleware from "@/lib/actions/middlewares/action-auth-middleware";

export const EstablishmentUploadLogoAction = actionClient
  .use(ActionAuthMiddleware)
  .schema(EstablishmentUploadLogoSchema)
  .bindArgsSchemas<[estId: z.ZodString]>([
    z.string().min(1, messages.validation.required),
  ])
  .action(
    async ({ parsedInput: { file }, bindArgsParsedInputs: [estId], ctx }) => {
      try {
        const existEstablishment = await db.establishment.findUnique({
          where: {
            id: estId,
            ...(ctx.session.user.role !== "admin" && {
              ownerId: ctx.session.user.id,
            }),
          },
          select: {
            id: true,
            logo: true,
          },
        });

        if (!existEstablishment) {
          throw new Error(messages.errors.common.notFound);
        }

        if (file instanceof File) {
          const fileBuffer = Buffer.from(await file.arrayBuffer());

          if (existEstablishment.logo !== null) {
            await removeImage(existEstablishment.logo);
          }

          const data = await uploadImage(fileBuffer, "establishment-logos", [
            240,
          ]);

          await db.establishment.update({
            where: { id: existEstablishment.id },
            data: { logo: data.path },
          });

          return {
            success: true,
            data,
          };
        }

        throw new Error(messages.validation.invalidImageType);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return {
            success: false,
            message: messages.errors.common.databaseError,
          };
        }
        throw error;
      }
    },
  );
