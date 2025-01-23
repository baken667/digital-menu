// import { MAX_FILE_SIZE } from "@/lib/consts";
// import { messages } from "@/lib/messages";
import { z } from "zod";

// export const IMAGE_SCHEMA = z
//   .instanceof(File)
//   .refine(
//     (file) =>
//       [
//         "image/png",
//         "image/jpeg",
//         "image/jpg",
//         "image/svg+xml",
//         "image/gif",
//       ].includes(file.type),
//     { message: messages.validation.invalidImageType },
//   )
//   .refine((file) => file.size <= MAX_FILE_SIZE, {
//     message: messages.validation.maxFileSize(MAX_FILE_SIZE),
//   });

export const IMAGE_SCHEMA = z
  .union([
    z.instanceof(File, { message: "Image is required" }),
    z.string().optional(), // Allow the existing image URL for editing mode
  ])
  .refine((value) => value instanceof File || typeof value === "string", {
    message: "Image is required",
  });
