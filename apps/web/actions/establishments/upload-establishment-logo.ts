"use server";

import { z } from "zod";
import { prisma } from "@dmu/prisma";
import { Prisma } from "@dmu/prisma/client";
import { UploadEstablishmentLogoSchema } from "@/schemas/establishments/upload-logo";
import { actionClient } from "../action-client";
import { authMiddleware } from "../middleware/auth-middleware";
import { messages } from "@/lib/messages";
import { upload } from "@/lib/storage";

export const uploadEstablishmentLogoAction = actionClient
  .schema(UploadEstablishmentLogoSchema)
  .use(authMiddleware)
  .bindArgsSchemas<[estId: z.ZodString]>([
    z.string().min(1, messages.validation.required),
  ])
  .action(
    async ({ parsedInput: { file }, bindArgsParsedInputs: [estId], ctx }) => {
      try {
        const establishmentExists = await prisma.establishment.count({
          where: {
            id: estId,
            ...(ctx.session.user.role !== "admin" && {
              ownerId: ctx.session.user.id,
            }),
          },
        });

        if (establishmentExists === 0) {
          throw new Error(messages.errors.common.notFound);
        }

        if (file instanceof File) {
          const fileBuffer = Buffer.from(await file.arrayBuffer());

          const data = await upload(fileBuffer, "establishment-logos", [240]);

          await prisma.establishment.update({
            where: { id: estId },
            data: {
              logo: data.path,
            },
          });

          return {
            success: true,
            data,
          };
        }

        throw new Error("не файл");
      } catch (error) {
        console.error(error);
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
