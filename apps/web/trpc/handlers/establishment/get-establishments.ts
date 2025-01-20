import { db } from "@/lib/prisma/db";
import { PaginatedParams } from "@/schemas/pagination-schema";
import { TRPCHandler } from "@/types/trpc-handler";

export async function handlerGetEstablishments({
  input: { input, limit, page },
  ctx,
}: TRPCHandler<{
  input: PaginatedParams<{ input?: string }>;
}>) {
  const [data, pagination] = await db.establishment
    .paginate({
      where: {
        ...(input && {
          OR: [
            { name: { contains: input, mode: "insensitive" } },
            { slug: { contains: input, mode: "insensitive" } },
          ],
        }),
        ...(ctx.session?.user.role !== "admin" && {
          ownerId: ctx.session?.user.id,
        }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        ...(ctx.session?.user.role === "admin" && {
          ownerId: true,
        }),
        createdAt: true,
        updatedAt: true,
      },
    })
    .withPages({
      limit,
      page,
      includePageCount: true,
    });

  return { data, pagination };
}
