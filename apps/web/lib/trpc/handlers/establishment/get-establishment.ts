import { messages } from "@/lib/messages";
import { TRPCHandler } from "@/types/trpc-handler";
import { prisma } from "@dmu/prisma";
import { TRPCError } from "@trpc/server";

export async function handlerGetEstablishment({
  input,
  ctx,
}: TRPCHandler<{ input: string }>) {
  const establishment = await prisma.establishment.findUnique({
    where: { id: input },
  });

  if (!establishment) {
    return null;
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
