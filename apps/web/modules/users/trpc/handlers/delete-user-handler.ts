import { TRPCHandler } from "@/app/types/trpc-handler";
import { messages } from "@/lib/messages";
import { prisma } from "@dmu/prisma";
import { TRPCError } from "@trpc/server";

export async function DeleteUserHandler({
  input,
}: TRPCHandler<{
  input: string;
}>) {
  const user = await prisma.user.findUnique({
    where: { id: input },
  });

  if (!user) {
    throw new TRPCError({
      message: messages.errors.users.notFound,
      code: "NOT_FOUND",
    });
  }

  await prisma.user.delete({
    where: { id: input },
  });

  return;
}
