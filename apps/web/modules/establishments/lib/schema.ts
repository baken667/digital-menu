import { z } from "zod";
import { messages } from "@/lib/messages";
import { SLUG_REGEX } from "@/lib/consts";
import { ImageSchema } from "@/lib/schemas/image-schema";

export const EstablishmentCreateSchema = z.object({
  name: z.string().min(1, messages.validation.required),
  slug: z
    .string()
    .min(1, messages.validation.required)
    .regex(SLUG_REGEX, messages.validation.format),
});

export const EstablishmentUploadLogoSchema = z.object({
  file: ImageSchema,
});
