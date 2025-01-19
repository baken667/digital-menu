import { messages } from "@/lib/messages";
import { Context } from "@/trpc/context";
import { TRPCError } from "@trpc/server";

export async function adminMiddleware(ctx: Context) {
  if (ctx.session?.user.role !== "admin") {
    throw new TRPCError({
      message: messages.errors.common.forbidden,
      code: 'FORBIDDEN'
    })
  }
}