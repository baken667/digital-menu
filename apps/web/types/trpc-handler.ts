import { Context } from "@/trpc/context";

export type TRPCHandler<T> = T & {
  ctx: Context;
};
