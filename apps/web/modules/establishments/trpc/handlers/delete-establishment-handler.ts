import { TRPCError } from "@trpc/server";
import { db } from "@/lib/prisma/db";
import { TRPCHandler } from "@/app/types/trpc-handler";
import { messages } from "@/lib/messages";

export async function DeleteEstablishmentHandler({
  input,
}: TRPCHandler<{
  input: string;
}>) {
  const establishmentExists = await db.establishment.count({
    where: { id: input },
  });

  if (establishmentExists <= 0) {
    throw new TRPCError({
      message: messages.errors.common.notFound,
      code: "NOT_FOUND",
    });
  }

  await db.establishment.delete({
    where: { id: input },
  });

  return;
}
