import { messages } from "@/lib/messages";
import getTrpc from "@/trpc";
import { TRPCError } from "@trpc/server";

export const t = getTrpc();

const adminTRPCMiddleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session || ctx.session.user.role !== "admin") {
    throw new TRPCError({
      message: messages.errors.common.forbidden,
      code: "FORBIDDEN",
    });
  }

  return next();
});

export default adminTRPCMiddleware;
