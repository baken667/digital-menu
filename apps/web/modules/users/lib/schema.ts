import { z } from "zod";
import { messages } from "@/lib/messages";
import { UserRoles } from "@prisma/client";

export const UserCreateSchema = z.object({
  name: z.string().min(1, messages.validation.required),
  email: z
    .string()
    .email(messages.validation.email)
    .min(1, messages.validation.required),
  role: z.nativeEnum(UserRoles, {
    message: messages.validation.email,
  }),
});

export const UserEditSchema = UserCreateSchema;
