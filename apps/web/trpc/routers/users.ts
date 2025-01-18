import { z } from "zod";
import { UserRoles } from "@dmu/prisma/client";
import getTrpc from "..";
import { handlerGetUsers } from "../handlers/users/get-users";
import { PaginatedParamsSchema } from "@/schemas/users/pagination-schema";

export const t = getTrpc();

export const usersRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        input: z.string().optional(),
        role: z.nativeEnum(UserRoles).optional(),
        ...PaginatedParamsSchema.shape,
      })
    )
    .query(handlerGetUsers),
});
