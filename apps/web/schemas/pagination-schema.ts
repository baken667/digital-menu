import { z } from "zod";

export const PaginatedParamsSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(10),
  page: z.number().min(1).optional(),
});

export type PaginatedParams<T> = z.infer<typeof PaginatedParamsSchema> & T;