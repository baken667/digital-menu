import { messages } from "@/lib/messages";
import { TRPCHandler } from "@/types/trpc-handler";
import { prisma } from "@dmu/prisma";
import { TRPCError } from "@trpc/server";
import { adminMiddleware } from "../middleware/admin-middleware";

export async function handleDeleteUser({
  input,
  ctx,
}: TRPCHandler<{
  input: string;
}>) {
  await adminMiddleware(ctx);

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
