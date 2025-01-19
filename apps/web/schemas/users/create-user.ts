import { z } from "zod";
import { UserRoles } from "@dmu/prisma/client";
import { messages } from "@/lib/messages";

export const CreateUserSchema = z.object({
  name: z.string().min(1, messages.validation.required),
  email: z
    .string()
    .email(messages.validation.email)
    .min(1, messages.validation.required),
  role: z.nativeEnum(UserRoles, {
    message: messages.validation.enum,
  }),
});
