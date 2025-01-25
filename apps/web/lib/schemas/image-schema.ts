import { z } from "zod";
import { messages } from "../messages";

export const ImageSchema = z
  .union([
    z.instanceof(File, { message: messages.validation.required }),
    z.string().optional(),
  ])
  .refine((value) => value instanceof File || typeof value === "string", {
    message: messages.validation.required,
  });
