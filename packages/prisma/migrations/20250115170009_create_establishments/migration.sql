-- CreateEnum
CREATE TYPE "EstablishmentContactType" AS ENUM ('email', 'phone', 'website', 'instagram', 'tiktok', 'whatsapp', 'doubleGis');

-- CreateTable
CREATE TABLE "Establishment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "address" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstablishmentContacts" (
    "id" TEXT NOT NULL,
    "type" "EstablishmentContactType" NOT NULL DEFAULT 'phone',
    "value" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,

    CONSTRAINT "EstablishmentContacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_slug_key" ON "Establishment"("slug");

-- CreateIndex
CREATE INDEX "Establishment_slug_idx" ON "Establishment"("slug");

-- CreateIndex
CREATE INDEX "Establishment_ownerId_idx" ON "Establishment"("ownerId");

-- CreateIndex
CREATE INDEX "EstablishmentContacts_establishmentId_idx" ON "EstablishmentContacts"("establishmentId");
