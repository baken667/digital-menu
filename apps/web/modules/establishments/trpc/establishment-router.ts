import { z } from "zod";
import getTrpc from "@/lib/trpc";
import TRPCAdminMiddleware from "@/lib/trpc/middleware/trpc-admin-middleware";
import { DeleteEstablishmentHandler } from "./handlers/delete-establishment-handler";
import { DeleteEstablishmentLogoHandler } from "./handlers/delete-establishment-logo-handler";
import TRPCAuthMiddleware from "@/lib/trpc/middleware/trpc-auth-middleware";
import { PaginatedParamsSchema } from "@/lib/schemas/pagination-schema";
import { ListEstablishmentHandler } from "./handlers/list-establishment-handler";
import { GetEstablishmentHandler } from "./handlers/get-establishment-handler";

export const t = getTrpc();

export const EstablishmentsTRPCRouter = t.router({
  delete: t.procedure
    .input(z.string())
    .use(TRPCAdminMiddleware)
    .mutation(DeleteEstablishmentHandler),
  deleteLogo: t.procedure
    .input(z.string())
    .use(TRPCAuthMiddleware)
    .mutation(DeleteEstablishmentLogoHandler),
  list: t.procedure
    .input(
      z.object({
        input: z.string().optional(),
        ...PaginatedParamsSchema.shape,
      }),
    )
    .use(TRPCAuthMiddleware)
    .query(ListEstablishmentHandler),
  get: t.procedure
    .input(z.string())
    .use(TRPCAuthMiddleware)
    .query(GetEstablishmentHandler),
});
