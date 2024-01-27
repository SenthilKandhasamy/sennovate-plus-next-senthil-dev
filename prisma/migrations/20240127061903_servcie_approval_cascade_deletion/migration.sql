-- DropForeignKey
ALTER TABLE "ApprovedService" DROP CONSTRAINT "ApprovedService_requestId_fkey";

-- AddForeignKey
ALTER TABLE "ApprovedService" ADD CONSTRAINT "ApprovedService_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PartnershipRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
