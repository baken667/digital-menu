import { UsersTRPCRouter } from "@/modules/users/trpc/users-router";
import getTrpc from "..";
import { establishmentsRouter } from "./establishments";

const t = getTrpc();

export const trpcRouter = t.router({
  establishment: establishmentsRouter,
  users: UsersTRPCRouter,
});

export type AppRouter = typeof trpcRouter;
