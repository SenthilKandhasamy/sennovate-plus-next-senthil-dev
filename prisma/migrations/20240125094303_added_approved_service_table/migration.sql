-- CreateTable
CREATE TABLE "ApprovedService" (
    "id" SERIAL NOT NULL,
    "partnerId" TEXT NOT NULL,
    "priceFactor" DOUBLE PRECISION,

    CONSTRAINT "ApprovedService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApprovedService" ADD CONSTRAINT "ApprovedService_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
