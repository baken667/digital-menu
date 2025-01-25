import { z } from "zod";
import { messages } from "@/lib/messages";

export const AuthLoginSchema = z.object({
  email: z.string().email(messages.validation.email),
  password: z.string().min(1, messages.validation.required),
});
