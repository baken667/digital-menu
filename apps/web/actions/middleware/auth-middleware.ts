import { auth } from "@/auth";
import { createMiddleware } from "next-safe-action";

export const authMiddleware = createMiddleware().define(async ({ next, ctx }) => {
  const session = await auth()

  return next({
    ctx: {
      ...ctx,
      session
    }
  })
})