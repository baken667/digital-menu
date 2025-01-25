import getTrpc from ".";
import { UsersTRPCRouter } from "@/modules/users/trpc/users-router";
import { EstablishmentsTRPCRouter } from "@/modules/establishments/trpc/establishment-router";

const t = getTrpc();

export const trpcRouter = t.router({
  establishments: EstablishmentsTRPCRouter,
  users: UsersTRPCRouter,
});

export type AppRouter = typeof trpcRouter;
