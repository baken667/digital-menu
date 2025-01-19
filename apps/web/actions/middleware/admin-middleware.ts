import { auth } from "@/auth";
import { messages } from "@/lib/messages";
import { createMiddleware } from "next-safe-action";

export const adminMiddleware = createMiddleware().define(async ({ next, ctx }) => {
  const session = await auth()

  if (!session) {
    throw new Error(messages.errors.common.unauthorized)
  }

  if (session.user.role !== "admin") {
    throw new Error(messages.errors.common.forbidden)
  }

  return next({
    ctx: {
      ...ctx,
      session
    }
  })
})