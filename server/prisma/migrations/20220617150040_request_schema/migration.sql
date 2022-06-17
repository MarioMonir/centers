-- DropForeignKey
ALTER TABLE `Request` DROP FOREIGN KEY `Request_toUserId_fkey`;

-- AlterTable
ALTER TABLE `Request` ADD COLUMN `toGroupId` INTEGER NULL,
    MODIFY `toUserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_toUserId_fkey` FOREIGN KEY (`toUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_toGroupId_fkey` FOREIGN KEY (`toGroupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
