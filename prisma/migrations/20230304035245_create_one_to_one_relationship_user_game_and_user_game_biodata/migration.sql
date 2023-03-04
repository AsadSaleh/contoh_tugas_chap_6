/*
  Warnings:

  - A unique constraint covering the columns `[userGameId]` on the table `UserGameBiodata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userGameId` to the `UserGameBiodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserGameBiodata" ADD COLUMN     "userGameId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserGameBiodata_userGameId_key" ON "UserGameBiodata"("userGameId");

-- AddForeignKey
ALTER TABLE "UserGameBiodata" ADD CONSTRAINT "UserGameBiodata_userGameId_fkey" FOREIGN KEY ("userGameId") REFERENCES "UserGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
