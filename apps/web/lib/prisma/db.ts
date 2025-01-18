import { prisma } from "@dmu/prisma";
import { pagination } from "prisma-extension-pagination";

export const db = prisma.$extends(pagination());
