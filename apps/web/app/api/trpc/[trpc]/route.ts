import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/lib/trpc/context";
import { trpcRouter } from "@/lib/trpc/router";

const t = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpcRouter,
    createContext,
  });
};

export { t as GET, t as POST, t as PUT, t as DELETE, t as PATCH };
