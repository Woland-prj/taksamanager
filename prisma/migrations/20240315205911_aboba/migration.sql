/*
  Warnings:

  - Added the required column `taskId` to the `TaskQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskQuestion" ADD COLUMN     "taskId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tgUsername" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskQuestion" ADD CONSTRAINT "TaskQuestion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
