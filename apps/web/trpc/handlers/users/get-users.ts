import { TRPCHandler } from "@/types/trpc-handler";
import { TRPCError } from "@trpc/server";
import { UserRoles } from "@dmu/prisma/client";
import { db } from "@/lib/prisma/db";
import { PaginatedParams } from "@/schemas/users/pagination-schema";

export async function handlerGetUsers({
  input: { input, role, limit, page },
  ctx,
}: TRPCHandler<{
  input: PaginatedParams<{ input?: string; role?: UserRoles }>;
}>) {
  if (ctx.session?.user.role !== "admin") {
    throw new TRPCError({
      message: "Forbidden",
      code: "FORBIDDEN",
    });
  }

  const data = await db.user
    .paginate({
      where: {
        ...(input && {
          OR: [
            { email: { contains: input, mode: "insensitive" } },
            { name: { contains: input, mode: "insensitive" } },
          ],
        }),
        ...(role && { role }),
      },
    })
    .withPages({
      limit,
      page,
      includePageCount: true,
    });

  return data;
}
