/*
  Warnings:

  - You are about to drop the column `userID` on the `Salesman` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Salesman` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Salesman" DROP CONSTRAINT "Salesman_userID_fkey";

-- AlterTable
ALTER TABLE "Salesman" DROP COLUMN "userID",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Salesman" ADD CONSTRAINT "Salesman_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
