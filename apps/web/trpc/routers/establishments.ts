import { z } from "zod";
import getTrpc from "..";
import { handlerGetEstablishment } from "../handlers/establishment/get-establishment";

export const t = getTrpc();

export const establishmentsRouter = t.router({
  get: t.procedure.input(z.string()).query(handlerGetEstablishment),
});