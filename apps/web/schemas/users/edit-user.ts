import { z } from "zod";
import { CreateUserSchema } from "./create-user";

export const EditUserSchema = CreateUserSchema;

export type EditUserSchemaType = z.infer<typeof EditUserSchema>;