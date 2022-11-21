/*
  Warnings:

  - Added the required column `userID` to the `Salesman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Salesman" ADD COLUMN     "userID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Salesman" ADD CONSTRAINT "Salesman_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
