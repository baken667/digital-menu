import { TRPCError } from "@trpc/server";
import { TRPCHandler } from "@/types/trpc-handler";
import { db } from "@/lib/prisma/db";
import { messages } from "@/lib/messages";

export async function handlerGetUser({
  input,
}: TRPCHandler<{ input: string }>) {
  const data = await db.user.findUnique({
    where: { id: input },
  });

  if (!data) {
    throw new TRPCError({
      message: messages.errors.users.notFound,
      code: "NOT_FOUND",
    });
  }

  return data;
}
