-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "totalCost" SET DEFAULT 0,
ALTER COLUMN "totalCost" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Rental_userId_idx" ON "Rental"("userId");

-- CreateIndex
CREATE INDEX "Rental_bikeId_idx" ON "Rental"("bikeId");
