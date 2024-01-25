/*
  Warnings:

  - Added the required column `serviceSlug` to the `ApprovedService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApprovedService" ADD COLUMN     "serviceSlug" TEXT NOT NULL;
