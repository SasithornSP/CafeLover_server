-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `additional` VARCHAR(191) NULL,
    ADD COLUMN `sweetness` ENUM('NoSweetness', 'lessSweetness', 'Sweet') NOT NULL DEFAULT 'Sweet';
