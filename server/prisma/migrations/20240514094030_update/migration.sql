/*
  Warnings:

  - The values [FRAME] on the enum `Post_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Frame_post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Frame_post` DROP FOREIGN KEY `Frame_post_postId_fkey`;

-- AlterTable
ALTER TABLE `Post` MODIFY `type` ENUM('PHOTOGRAPHY', 'REALIZATION', 'TEXT', 'BLOG') NOT NULL;

-- DropTable
DROP TABLE `Frame_post`;

-- CreateTable
CREATE TABLE `Image_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `postId` INTEGER NOT NULL,

    UNIQUE INDEX `unique_image_post`(`image`, `postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image_post` ADD CONSTRAINT `Image_post_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
