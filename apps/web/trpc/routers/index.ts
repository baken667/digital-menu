import getTrpc from "..";
import { establishmentsRouter } from "./establishments";
import { usersRouter } from "./users";

const t = getTrpc();

export const trpcRouter = t.router({
  establishment: establishmentsRouter,
  users: usersRouter,
});

export type AppRouter = typeof trpcRouter;
