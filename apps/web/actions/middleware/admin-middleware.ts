import { createMiddleware } from "next-safe-action";

export const authMiddleware = createMiddleware().define(
  async ({ next, ctx }) => {
    console.log(ctx);

    return next();
  }
);
