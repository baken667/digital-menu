import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

export default function getTrpc() {
  return initTRPC.context<Context>().create({
    transformer: superjson,
  });
}
