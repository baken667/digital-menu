import { auth } from "@/auth";
import { messages } from "@/lib/messages";
import { createMiddleware } from "next-safe-action";

const ActionGuestMiddleware = createMiddleware().define(
  async ({ next, ctx }) => {
    const session = await auth();

    if (session) {
      throw new Error(messages.errors.common.forbidden);
    }

    return next({
      ctx: {
        ...ctx,
        session,
      },
    });
  },
);

export default ActionGuestMiddleware;
