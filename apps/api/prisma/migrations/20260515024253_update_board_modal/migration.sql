/*
  Warnings:

  - Added the required column `authorId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isATemplate" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
