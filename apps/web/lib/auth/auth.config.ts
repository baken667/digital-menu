import { prisma } from "@dmu/prisma";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@dmu/features/auth";
import { AuthLoginSchema } from "@/modules/auth/lib/schema";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = AuthLoginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash) return null;

          const compare = await comparePassword(password, user.passwordHash);

          if (compare) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
