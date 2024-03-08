/*
  Warnings:

  - A unique constraint covering the columns `[id,username,email,password,role,depId,depName,tgUsername]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tgUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId,username,email,password,role,depId,depName,tgUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tgUsername` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileId_username_email_password_role_depId_depName_fkey";

-- DropIndex
DROP INDEX "Profile_id_username_email_password_role_depId_depName_key";

-- DropIndex
DROP INDEX "User_profileId_username_email_password_role_depId_depName_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tgUsername" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_username_email_password_role_depId_depName_tgUse_key" ON "Profile"("id", "username", "email", "password", "role", "depId", "depName", "tgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_tgUsername_key" ON "User"("tgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_username_email_password_role_depId_depName_t_key" ON "User"("profileId", "username", "email", "password", "role", "depId", "depName", "tgUsername");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_username_email_password_role_depId_depName__fkey" FOREIGN KEY ("profileId", "username", "email", "password", "role", "depId", "depName", "tgUsername") REFERENCES "Profile"("id", "username", "email", "password", "role", "depId", "depName", "tgUsername") ON DELETE RESTRICT ON UPDATE CASCADE;
