import { TRPCError } from "@trpc/server";
import { TRPCHandler } from "@/types/trpc-handler";
import { messages } from "@/lib/messages";
import { prisma } from "@dmu/prisma";
import { remove } from "@/lib/storage";

export async function handlerDeleteEstablishmentLogo({
  input,
  ctx,
}: TRPCHandler<{ input: string }>) {
  const establishment = await prisma.establishment.findUnique({
    where: { id: input },
    select: {
      id: true,
      ownerId: true,
      logo: true,
    },
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

  if (!establishment.logo) {
    return {
      success: true,
      messages: messages.establishments.logoDeleted,
    };
  }

  try {
    await remove(establishment.logo);

    await prisma.establishment.update({
      where: { id: input },
      data: {
        logo: null,
      },
    });

    return {
      success: true,
      messages: messages.establishments.logoDeleted,
    };
  } catch (error) {
    throw error;
  }
}
