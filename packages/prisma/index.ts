import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;

  namespace PrismaJson {}
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;
