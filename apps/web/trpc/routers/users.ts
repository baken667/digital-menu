import { z } from "zod";
import { UserRoles } from "@dmu/prisma/client";
import getTrpc from "..";
import { handlerGetUsers } from "../handlers/users/get-users";
import { PaginatedParamsSchema } from "@/schemas/pagination-schema";
import { handleDeleteUser } from "../handlers/users/delete-user";
import { handlerGetUser } from "../handlers/users/get-user";
import adminTRPCMiddleware from "../handlers/middleware/admin-middleware";

export const t = getTrpc();

export const usersRouter = t.router({
  list: t.procedure
    .use(adminTRPCMiddleware)
    .input(
      z.object({
        input: z.string().optional(),
        role: z.nativeEnum(UserRoles).optional(),
        ...PaginatedParamsSchema.shape,
      }),
    )
    .query(handlerGetUsers),
  delete: t.procedure
    .input(z.string())
    .use(adminTRPCMiddleware)
    .mutation(handleDeleteUser),
  get: t.procedure
    .input(z.string())
    .use(adminTRPCMiddleware)
    .query(handlerGetUser),
});
