/*
  Warnings:

  - The `logo` column on the `Establishment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Establishment" DROP COLUMN "logo",
ADD COLUMN     "logo" JSONB;
