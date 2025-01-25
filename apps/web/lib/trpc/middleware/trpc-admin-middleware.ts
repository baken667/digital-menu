import { TRPCError } from "@trpc/server";
import getTrpc from "..";
import { messages } from "@/lib/messages";

export const t = getTrpc();

const TRPCAdminMiddleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session || ctx.session.user.role !== "admin") {
    throw new TRPCError({
      message: messages.errors.common.forbidden,
      code: "FORBIDDEN",
    });
  }

  return next();
});

export default TRPCAdminMiddleware;
