-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('admin', 'owner');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'owner';
