-- AlterEnum
ALTER TYPE "PartnershipApplicationStatus" ADD VALUE 'Rejected';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "remark" DROP NOT NULL;
