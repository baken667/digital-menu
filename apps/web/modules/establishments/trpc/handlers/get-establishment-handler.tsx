import { TRPCHandler } from "@/app/types/trpc-handler";
import { messages } from "@/lib/messages";
import { db } from "@/lib/prisma/db";
import { TRPCError } from "@trpc/server";

export async function GetEstablishmentHandler({
  input,
  ctx,
}: TRPCHandler<{
  input: string;
}>) {
  const establishment = await db.establishment.findUnique({
    where: { id: input },
  });

  if (!establishment) {
    throw new TRPCError({
      message: messages.errors.common.notFound,
      code: "NOT_FOUND",
    });
  }

  if (
    ctx.session?.user.role !== "admin" &&
    ctx.session?.user.id !== establishment.ownerId
  ) {
    throw new TRPCError({
      message: messages.errors.common.forbidden,
      code: "FORBIDDEN",
    });
  }

  return establishment;
}
