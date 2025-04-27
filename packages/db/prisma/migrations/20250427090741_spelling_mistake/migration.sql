/*
  Warnings:

  - You are about to drop the column `thubmnail` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "thubmnail",
ADD COLUMN     "thumbnail" TEXT NOT NULL DEFAULT 'https://fuchsia-legal-roundworm-794.mypinata.cloud/ipfs/bafkreiazrz2ujhogzy55d7brioqeth3t2i56yfv5o65wgtmot4e6vsqiwa';
