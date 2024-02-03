/*
  Warnings:

  - The values [WORKING,VERIFYREJECTED] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `departament` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `BrifDesign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrifPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrifPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrifVideo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[brifId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brifId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('MODIFIED', 'CREATED', 'INWORK', 'COMPLETED', 'VERIFYCOMPLETED', 'REJECTED', 'REJECTEDBYLEAD', 'REJECTEDBYADMIN');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'NOTDEFINED';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "departament",
ADD COLUMN     "brifId" TEXT NOT NULL,
ADD COLUMN     "depId" TEXT NOT NULL,
ADD COLUMN     "depName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "depId" TEXT,
ADD COLUMN     "depName" TEXT;

-- DropTable
DROP TABLE "BrifDesign";

-- DropTable
DROP TABLE "BrifPhoto";

-- DropTable
DROP TABLE "BrifPost";

-- DropTable
DROP TABLE "BrifVideo";

-- DropEnum
DROP TYPE "Dep";

-- CreateTable
CREATE TABLE "Departament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leaderId" TEXT NOT NULL,
    "leaderName" TEXT NOT NULL,
    "memberId" TEXT[],
    "memberName" TEXT[],

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTemplate" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "depName" TEXT NOT NULL,

    CONSTRAINT "QuestionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrifQuestion" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "templateText" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "BrifQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brif" (
    "id" TEXT NOT NULL,
    "qNames" TEXT[],
    "qAnswers" TEXT[],

    CONSTRAINT "Brif_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departament_name_key" ON "Departament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_leaderId_leaderName_key" ON "Departament"("leaderId", "leaderName");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_id_name_key" ON "Departament"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTemplate_id_text_key" ON "QuestionTemplate"("id", "text");

-- CreateIndex
CREATE UNIQUE INDEX "BrifQuestion_id_answer_key" ON "BrifQuestion"("id", "answer");

-- CreateIndex
CREATE UNIQUE INDEX "Brif_qNames_qAnswers_key" ON "Brif"("qNames", "qAnswers");

-- CreateIndex
CREATE UNIQUE INDEX "Task_brifId_key" ON "Task"("brifId");

-- AddForeignKey
ALTER TABLE "Departament" ADD CONSTRAINT "Departament_leaderId_leaderName_fkey" FOREIGN KEY ("leaderId", "leaderName") REFERENCES "User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_depId_depName_fkey" FOREIGN KEY ("depId", "depName") REFERENCES "Departament"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_depId_depName_fkey" FOREIGN KEY ("depId", "depName") REFERENCES "Departament"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_brifId_fkey" FOREIGN KEY ("brifId") REFERENCES "Brif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTemplate" ADD CONSTRAINT "QuestionTemplate_depName_fkey" FOREIGN KEY ("depName") REFERENCES "Departament"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrifQuestion" ADD CONSTRAINT "BrifQuestion_templateId_templateText_fkey" FOREIGN KEY ("templateId", "templateText") REFERENCES "QuestionTemplate"("id", "text") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrifQuestion" ADD CONSTRAINT "BrifQuestion_templateText_answer_fkey" FOREIGN KEY ("templateText", "answer") REFERENCES "Brif"("qNames", "qAnswers") ON DELETE RESTRICT ON UPDATE CASCADE;
