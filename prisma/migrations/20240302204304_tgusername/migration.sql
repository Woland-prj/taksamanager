/*
  Warnings:

  - A unique constraint covering the columns `[tgUsername]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId,clientName]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[executorId,executorName]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tgUsername` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "tgUsername" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_tgUsername_key" ON "Profile"("tgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Task_clientId_clientName_key" ON "Task"("clientId", "clientName");

-- CreateIndex
CREATE UNIQUE INDEX "Task_executorId_executorName_key" ON "Task"("executorId", "executorName");
