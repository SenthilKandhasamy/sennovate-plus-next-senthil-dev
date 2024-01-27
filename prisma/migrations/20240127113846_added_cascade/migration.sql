/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PartnershipRequest" DROP CONSTRAINT "PartnershipRequest_partnerEmployeeId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PartnershipRequest" ADD CONSTRAINT "PartnershipRequest_partnerEmployeeId_fkey" FOREIGN KEY ("partnerEmployeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
