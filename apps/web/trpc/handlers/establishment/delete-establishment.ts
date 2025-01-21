import { TRPCHandler } from "@/types/trpc-handler";
import { prisma } from "@dmu/prisma";
import { TRPCError } from "@trpc/server";
import { messages } from "@/lib/messages";

export async function handlerDeleteEstablishment({
  input,
}: TRPCHandler<{
  input: string;
}>) {
  const establishment = await prisma.establishment.findUnique({
    where: { id: input },
    select: {
      id: true,
    },
  });

  if (!establishment) {
    throw new TRPCError({
      message: messages.errors.common.notFound,
      code: "NOT_FOUND",
    });
  }

  return;
}
