/*
  Warnings:

  - A unique constraint covering the columns `[id,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('MODIFIED', 'CREATED', 'WORKING', 'COMPLETED', 'VERIFYCOMPLETED', 'REJECTED', 'VERIFYREJECTED');

-- CreateEnum
CREATE TYPE "Dep" AS ENUM ('VIDEOPROD', 'DESIGNPROD', 'CONTENTPROD');

-- CreateTable
CREATE TABLE "BrifVideo" (
    "id" TEXT NOT NULL,

    CONSTRAINT "BrifVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrifPhoto" (
    "id" TEXT NOT NULL,

    CONSTRAINT "BrifPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrifDesign" (
    "id" TEXT NOT NULL,

    CONSTRAINT "BrifDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrifPost" (
    "id" TEXT NOT NULL,

    CONSTRAINT "BrifPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "executorId" TEXT,
    "executorName" TEXT,
    "clientId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "departament" "Dep" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_executorId_key" ON "Task"("executorId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_clientId_key" ON "Task"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_key" ON "User"("id", "username");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_executorName_fkey" FOREIGN KEY ("executorId", "executorName") REFERENCES "User"("id", "username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;
