import { EditUserSchemaType } from "@/schemas/users/edit-user";
import { TRPCHandler } from "@/types/trpc-handler";
import { adminMiddleware } from "../middleware/admin-middleware";
import { prisma } from "@dmu/prisma";
import { TRPCError } from "@trpc/server";
import { messages } from "@/lib/messages";

type HandlerProps = TRPCHandler<{
  input: {
    id: string;
    data: EditUserSchemaType;
  };
}>;

export async function handleUpdateUser({ input, ctx }: HandlerProps) {
  await adminMiddleware(ctx);

  const user = await prisma.user.findUnique({
    where: { id: input.id },
  });

  if (!user) {
    throw new TRPCError({
      message: messages.errors.users.notFound,
      code: "NOT_FOUND",
    });
  }

  await prisma.user.update({
    where: { id: input.id },
    data: input.data,
  });

  return;
}
