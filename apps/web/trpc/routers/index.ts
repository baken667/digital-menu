import getTrpc from "..";
import { establishmentsRouter } from "./establishments";

const t = getTrpc();

export const trpcRouter = t.router({
  establishment: establishmentsRouter,
});

export type AppRouter = typeof trpcRouter;
