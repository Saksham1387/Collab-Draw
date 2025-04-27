/*
  Warnings:

  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "thubmnail" TEXT NOT NULL DEFAULT 'https://fuchsia-legal-roundworm-794.mypinata.cloud/ipfs/bafkreiazrz2ujhogzy55d7brioqeth3t2i56yfv5o65wgtmot4e6vsqiwa',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
