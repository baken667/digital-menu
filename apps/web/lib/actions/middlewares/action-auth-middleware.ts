import { auth } from "@/auth";
import { messages } from "@/lib/messages";
import { createMiddleware } from "next-safe-action";

const ActionAuthMiddleware = createMiddleware().define(
  async ({ next, ctx }) => {
    const session = await auth();

    if (!session) {
      throw new Error(messages.errors.common.unauthorized);
    }

    return next({
      ctx: {
        ...ctx,
        session,
      },
    });
  },
);

export default ActionAuthMiddleware;
