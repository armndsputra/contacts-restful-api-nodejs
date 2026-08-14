/*
  Warnings:

  - You are about to drop the column `province` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `province`,
    ADD COLUMN `provence` VARCHAR(100) NULL;
