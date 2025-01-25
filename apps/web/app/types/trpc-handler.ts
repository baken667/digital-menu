import { Context } from "@/lib/trpc/context";

export type TRPCHandler<T> = T & {
  ctx: Context;
};
