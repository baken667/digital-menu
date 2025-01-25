import { z } from "zod";
import getTrpc from "..";
import { handlerGetEstablishment } from "../handlers/establishment/get-establishment";
import { handlerGetEstablishments } from "../handlers/establishment/get-establishments";
import { handlerDeleteEstablishment } from "../handlers/establishment/delete-establishment";
import { handlerDeleteEstablishmentLogo } from "../handlers/establishment/delete-establishment-logo";
import { PaginatedParamsSchema } from "@/lib/schemas/pagination-schema";
import TRPCAdminMiddleware from "../middleware/trpc-admin-middleware";

export const t = getTrpc();

export const establishmentsRouter = t.router({
  list: t.procedure
    .input(
      z.object({
        input: z.string().optional(),
        ...PaginatedParamsSchema.shape,
      }),
    )
    .query(handlerGetEstablishments),
  get: t.procedure.input(z.string()).query(handlerGetEstablishment),
  delete: t.procedure
    .input(z.string())
    .use(TRPCAdminMiddleware)
    .mutation(handlerDeleteEstablishment),
  deleteLogo: t.procedure
    .input(z.string())
    .mutation(handlerDeleteEstablishmentLogo),
});
