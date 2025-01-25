import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;

  namespace PrismaJson {
    type ImageJsonType = {
      path: string;
      thumbs?: number[];
    };
  }
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;
