import { z } from "zod";
import { UserRoles } from "@dmu/prisma/client";
import getTrpc from "@/lib/trpc";
import { PaginatedParamsSchema } from "@/lib/schemas/pagination-schema";
import { DeleteUserHandler } from "./handlers/delete-user-handler";
import { GetUserHandler } from "./handlers/get-user-handler";
import { ListUserHandler } from "./handlers/list-user-handler";
import TRPCAdminMiddleware from "@/lib/trpc/middleware/trpc-admin-middleware";

export const t = getTrpc();

export const UsersTRPCRouter = t.router({
  list: t.procedure
    .use(TRPCAdminMiddleware)
    .input(
      z.object({
        input: z.string().optional(),
        role: z.nativeEnum(UserRoles).optional(),
        ...PaginatedParamsSchema.shape,
      }),
    )
    .query(ListUserHandler),
  delete: t.procedure
    .input(z.string())
    .use(TRPCAdminMiddleware)
    .mutation(DeleteUserHandler),
  get: t.procedure
    .input(z.string())
    .use(TRPCAdminMiddleware)
    .query(GetUserHandler),
});
