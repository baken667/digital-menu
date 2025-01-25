import { z } from "zod";
import { messages } from "@/lib/messages";
import { UserRoles } from "@prisma/client";
import { CreateUserSchema } from "@/schemas/users/create-user";

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

export const EditUserSchema = CreateUserSchema;
