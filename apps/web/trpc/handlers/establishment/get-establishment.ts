import { TRPCHandler } from "@/types/trpc-handler";
import { prisma } from "@dmu/prisma";

export async function handlerGetEstablishment({
  input,
}: TRPCHandler<{ input: string }>) {
  const establishment = await prisma.establishment.findUnique({
    where: { id: input },
  });

  if (!establishment) {
    return null;
  }

  return establishment;
}
