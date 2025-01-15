import { hashPassword } from "@dmu/features/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: "baken.wws@gmail.com" },
    update: {},
    create: {
      name: "Baken",
      email: "baken.wws@gmail.com",
      passwordHash: await hashPassword("password"),
      role: "admin",
    },
  });

  console.log({ adminUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });