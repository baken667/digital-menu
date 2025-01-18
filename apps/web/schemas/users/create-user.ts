import { z } from "zod";
import { UserRoles } from "@dmu/prisma/client";

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(UserRoles),
});
