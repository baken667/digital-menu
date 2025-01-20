import { z } from "zod";
import getTrpc from "..";
import { handlerGetEstablishment } from "../handlers/establishment/get-establishment";
import { PaginatedParamsSchema } from "@/schemas/pagination-schema";
import { handlerGetEstablishments } from "../handlers/establishment/get-establishments";

export const t = getTrpc();

export const establishmentsRouter = t.router({
  list: t.procedure
    .input(
      z.object({
        input: z.string().optional(),
        ...PaginatedParamsSchema.shape,
      })
    )
    .query(handlerGetEstablishments),
  get: t.procedure.input(z.string()).query(handlerGetEstablishment),
});
