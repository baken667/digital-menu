import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpcRouter } from "@/lib/trpc/routers";
import { createContext } from "@/lib/trpc/context";

const t = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpcRouter,
    createContext,
  });
};

export { t as GET, t as POST, t as PUT, t as DELETE, t as PATCH };
