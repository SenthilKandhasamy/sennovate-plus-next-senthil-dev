/*
  Warnings:

  - You are about to drop the column `partnerId` on the `ApprovedService` table. All the data in the column will be lost.
  - You are about to drop the column `priceFactor` on the `ApprovedService` table. All the data in the column will be lost.
  - You are about to drop the column `serviceSlug` on the `ApprovedService` table. All the data in the column will be lost.
  - You are about to drop the column `applicationStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `partnershipType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestId` to the `ApprovedService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ApprovedService` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartnershipRequestStatus" AS ENUM ('Submitted', 'UnderProcess', 'Approved', 'Rejected');

-- DropForeignKey
ALTER TABLE "ApprovedService" DROP CONSTRAINT "ApprovedService_partnerId_fkey";

-- DropIndex
DROP INDEX "User_companyEmail_key";

-- AlterTable
ALTER TABLE "ApprovedService" DROP COLUMN "partnerId",
DROP COLUMN "priceFactor",
DROP COLUMN "serviceSlug",
ADD COLUMN     "requestId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "applicationStatus",
DROP COLUMN "companyEmail",
DROP COLUMN "companyName",
DROP COLUMN "country",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "jobTitle",
DROP COLUMN "lastName",
DROP COLUMN "partnershipType",
DROP COLUMN "phone",
DROP COLUMN "remark",
DROP COLUMN "state",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "roles" TEXT[];

-- DropEnum
DROP TYPE "PartnershipApplicationStatus";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "website" TEXT,
    "state" TEXT,
    "domain" TEXT,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerEmployee" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "PartnerEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnershipRequest" (
    "id" TEXT NOT NULL,
    "partnerEmployeeId" TEXT NOT NULL,
    "status" "PartnershipRequestStatus" NOT NULL DEFAULT 'Submitted',
    "requestedFor" "PartnershipType" NOT NULL,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ndaSigned" BOOLEAN NOT NULL DEFAULT false,
    "msaSigned" BOOLEAN NOT NULL DEFAULT false,
    "resellerAgreementSigned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PartnershipRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "userIdentifier" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partnershipRequestId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PartnershipRequest_partnerEmployeeId_key" ON "PartnershipRequest"("partnerEmployeeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerEmployee" ADD CONSTRAINT "PartnerEmployee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnershipRequest" ADD CONSTRAINT "PartnershipRequest_partnerEmployeeId_fkey" FOREIGN KEY ("partnerEmployeeId") REFERENCES "PartnerEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovedService" ADD CONSTRAINT "ApprovedService_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PartnershipRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_partnershipRequestId_fkey" FOREIGN KEY ("partnershipRequestId") REFERENCES "PartnershipRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
