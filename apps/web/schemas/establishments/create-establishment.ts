import { SLUG_REGEX } from "@/lib/consts";
import { messages } from "@/lib/messages";
import { z } from "zod";

export const CreateEstablishmentSchema = z.object({
  name: z.string().min(1, messages.validation.required),
  slug: z
    .string()
    .min(1, messages.validation.required)
    .regex(SLUG_REGEX, messages.validation.format),
});
