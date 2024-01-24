-- CreateEnum
CREATE TYPE "PartnershipApplicationStatus" AS ENUM ('Submitted', 'UnderProcess', 'Approved');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "applicationStatus" "PartnershipApplicationStatus" NOT NULL DEFAULT 'Submitted';
