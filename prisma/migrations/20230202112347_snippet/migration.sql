/*
  Warnings:

  - You are about to drop the column `user_id` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Snippets` DROP FOREIGN KEY `Snippets_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_user_id_fkey`;

-- AlterTable
ALTER TABLE `Snippets` MODIFY `category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `user_id`;

-- AddForeignKey
ALTER TABLE `Snippets` ADD CONSTRAINT `Snippets_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
