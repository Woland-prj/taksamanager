-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ROOT', 'ADMIN', 'EXECUTOR', 'CLIENT', 'NOTDEFINED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('MODIFIED', 'CREATED', 'INWORK', 'COMPLETED', 'VERIFYCOMPLETED', 'REJECTED', 'REJECTEDBYLEAD', 'REJECTEDBYADMIN');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('DESIGN', 'PHOTO', 'VIDEO', 'MONTAGE', 'POST');

-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JwtToken" (
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "tgUsername" VARCHAR(64),
    "role" "UserRole" NOT NULL,
    "actLink" UUID NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "teamId" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "responseId" TEXT NOT NULL,
    "executorId" UUID,
    "executorName" TEXT,
    "formClientName" TEXT NOT NULL,
    "clientId" UUID,
    "clientName" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTemplate" (
    "id" UUID NOT NULL,
    "qid" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "QuestionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskQuestion" (
    "id" UUID NOT NULL,
    "questionText" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "taskId" UUID NOT NULL,

    CONSTRAINT "TaskQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JwtToken_userId_key" ON "JwtToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JwtToken_token_key" ON "JwtToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tgUsername_key" ON "User"("tgUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_actLink_key" ON "User"("actLink");

-- CreateIndex
CREATE UNIQUE INDEX "User_teamId_key" ON "User"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_key" ON "User"("id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Task_responseId_key" ON "Task"("responseId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTemplate_qid_key" ON "QuestionTemplate"("qid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "User"("id", "username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_executorName_fkey" FOREIGN KEY ("executorId", "executorName") REFERENCES "User"("id", "username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskQuestion" ADD CONSTRAINT "TaskQuestion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
