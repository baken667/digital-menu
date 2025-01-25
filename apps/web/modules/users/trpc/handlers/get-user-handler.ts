import { TRPCError } from "@trpc/server";
import { db } from "@/lib/prisma/db";
import { messages } from "@/lib/messages";
import { TRPCHandler } from "@/app/types/trpc-handler";

export async function GetUserHandler({
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
