/*
  Warnings:

  - You are about to drop the `PartnerEmployee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PartnerEmployee" DROP CONSTRAINT "PartnerEmployee_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipRequest" DROP CONSTRAINT "PartnershipRequest_partnerEmployeeId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "PartnerEmployee";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipRequest" ADD CONSTRAINT "PartnershipRequest_partnerEmployeeId_fkey" FOREIGN KEY ("partnerEmployeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
