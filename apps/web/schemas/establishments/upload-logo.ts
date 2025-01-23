import { z } from "zod";
import { IMAGE_SCHEMA } from "../file-schemas";

export const UploadEstablishmentLogoSchema = z.object({
  file: IMAGE_SCHEMA,
});
