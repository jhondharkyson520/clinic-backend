/*
  Warnings:

  - You are about to drop the column `planoFamiliar` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPlano` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "planoFamiliar",
DROP COLUMN "tipoPlano";
