import { TRPCError } from "@trpc/server";
import { TRPCHandler } from "@/app/types/trpc-handler";
import { messages } from "@/lib/messages";
import { db } from "@/lib/prisma/db";
import { removeImage } from "@/lib/storage";

export async function DeleteEstablishmentLogoHandler({
  input,
  ctx,
}: TRPCHandler<{ input: string }>) {
  const establishment = await db.establishment.findUnique({
    where: { id: input },
    select: {
      id: true,
      ownerId: true,
      logo: true,
    },
  });

  if (
    ctx.session?.user.role !== "admin" &&
    ctx.session?.user.id !== establishment?.ownerId
  ) {
    throw new TRPCError({
      message: messages.errors.common.forbidden,
      code: "FORBIDDEN",
    });
  }

  if (!establishment?.logo) {
    return {
      success: true,
      messages: messages.establishments.logoDeleted,
    };
  }

  try {
    await removeImage(establishment.logo);

    await db.establishment.update({
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
