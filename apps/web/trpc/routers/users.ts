import { z } from "zod";
import { UserRoles } from "@dmu/prisma/client";
import getTrpc from "..";
import { handlerGetUsers } from "../handlers/users/get-users";
import { PaginatedParamsSchema } from "@/schemas/pagination-schema";
import { handleDeleteUser } from "../handlers/users/delete-user";
import { EditUserSchema } from "@/schemas/users/edit-user";
import { handleUpdateUser } from "../handlers/users/edit-user";
import { handlerGetUser } from "../handlers/users/get-user";

export const t = getTrpc();

export const usersRouter = t.router({
  list: t.procedure
    .input(
      z.object({
        input: z.string().optional(),
        role: z.nativeEnum(UserRoles).optional(),
        ...PaginatedParamsSchema.shape,
      })
    )
    .query(handlerGetUsers),
  delete: t.procedure.input(z.string()).mutation(handleDeleteUser),
  get: t.procedure.input(z.string()).query(handlerGetUser),
  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        data: EditUserSchema,
      })
    )
    .mutation(handleUpdateUser),
});
