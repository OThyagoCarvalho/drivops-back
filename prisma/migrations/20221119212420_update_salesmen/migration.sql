/*
  Warnings:

  - You are about to drop the column `cpf` on the `Salesman` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Salesman_cpf_key";

-- AlterTable
ALTER TABLE "Salesman" DROP COLUMN "cpf";
