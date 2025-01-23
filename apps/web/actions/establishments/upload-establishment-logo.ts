"use server";

import { v4 as uuidv4 } from "uuid";
import { prisma } from "@dmu/prisma";
import { Prisma } from "@dmu/prisma/client";
import { UploadEstablishmentLogoSchema } from "@/schemas/establishments/upload-logo";
import { actionClient } from "../action-client";
import { authMiddleware } from "../middleware/auth-middleware";
import { messages } from "@/lib/messages";
import { BUCKET } from "@/lib/consts";
import { s3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
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
          const contentType = file.type;
          const fileBuffer = await file.arrayBuffer();
          const fileKey = `logos/${uuidv4()}`;

          const data = await s3Client.send(
            new PutObjectCommand({
              Bucket: BUCKET,
              Key: fileKey,
              Body: Buffer.from(fileBuffer),
              ContentType: contentType,
            }),
          );

          const imageUrl = `${process.env.S3_ENDPOINT}/${fileKey}`;

          return {
            success: true,
            imageUrl,
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
    },
  );
