/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Salesman` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Salesman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Salesman" ADD COLUMN     "cpf" CHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Salesman_cpf_key" ON "Salesman"("cpf");
