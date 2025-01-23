"use server";

import { prisma } from "@dmu/prisma";
import { Prisma } from "@dmu/prisma/client";
import { UploadEstablishmentLogoSchema } from "@/schemas/establishments/upload-logo";
import { actionClient } from "../action-client";
import { authMiddleware } from "../middleware/auth-middleware";
import { messages } from "@/lib/messages";
import { storageClient } from "@/lib/storage";
import { z } from "zod";

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

          const data = await storageClient.upload(
            fileBuffer,
            "establishment-logos"
          );

          return {
            success: true,
            data,
          };
        }
        throw new Error("не файл");
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return {
            success: false,
            message: messages.errors.common.databaseError,
          };
        }
        throw error;
      }
    }
  );
