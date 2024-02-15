-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ROOT', 'ADMIN', 'LEADER', 'EXECUTOR', 'CLIENT', 'NOTDEFINED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('MODIFIED', 'CREATED', 'INWORK', 'COMPLETED', 'VERIFYCOMPLETED', 'REJECTED', 'REJECTEDBYLEAD', 'REJECTEDBYADMIN');

-- CreateTable
CREATE TABLE "Departament" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "leaderId" UUID NOT NULL,
    "leaderName" TEXT NOT NULL,
    "memberId" UUID[],
    "memberName" TEXT[],

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JwtToken" (
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "JwtToken_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'NOTDEFINED',
    "depId" UUID,
    "depName" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "role" "UserRole" NOT NULL,
    "depId" UUID,
    "depName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "executorId" UUID,
    "executorName" TEXT,
    "clientId" UUID NOT NULL,
    "clientName" TEXT NOT NULL,
    "depId" UUID NOT NULL,
    "depName" TEXT NOT NULL,
    "brifId" UUID NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTemplate" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "depName" TEXT NOT NULL,

    CONSTRAINT "QuestionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrifQuestion" (
    "id" UUID NOT NULL,
    "brifId" UUID NOT NULL,
    "templateId" UUID NOT NULL,
    "templateText" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "BrifQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brif" (
    "id" UUID NOT NULL,

    CONSTRAINT "Brif_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departament_name_key" ON "Departament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_leaderId_leaderName_key" ON "Departament"("leaderId", "leaderName");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_id_name_key" ON "Departament"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "JwtToken_token_key" ON "JwtToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_username_email_password_role_depId_depName_key" ON "Profile"("id", "username", "email", "password", "role", "depId", "depName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_username_email_password_role_depId_depName_key" ON "User"("profileId", "username", "email", "password", "role", "depId", "depName");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_key" ON "User"("id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Task_executorId_key" ON "Task"("executorId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_clientId_key" ON "Task"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_brifId_key" ON "Task"("brifId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTemplate_id_text_key" ON "QuestionTemplate"("id", "text");

-- CreateIndex
CREATE UNIQUE INDEX "BrifQuestion_id_answer_key" ON "BrifQuestion"("id", "answer");

-- AddForeignKey
ALTER TABLE "Departament" ADD CONSTRAINT "Departament_leaderId_leaderName_fkey" FOREIGN KEY ("leaderId", "leaderName") REFERENCES "User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_depId_depName_fkey" FOREIGN KEY ("depId", "depName") REFERENCES "Departament"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_username_email_password_role_depId_depName_fkey" FOREIGN KEY ("profileId", "username", "email", "password", "role", "depId", "depName") REFERENCES "Profile"("id", "username", "email", "password", "role", "depId", "depName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_executorName_fkey" FOREIGN KEY ("executorId", "executorName") REFERENCES "User"("id", "username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_clientId_clientName_fkey" FOREIGN KEY ("clientId", "clientName") REFERENCES "User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_depId_depName_fkey" FOREIGN KEY ("depId", "depName") REFERENCES "Departament"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_brifId_fkey" FOREIGN KEY ("brifId") REFERENCES "Brif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTemplate" ADD CONSTRAINT "QuestionTemplate_depName_fkey" FOREIGN KEY ("depName") REFERENCES "Departament"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrifQuestion" ADD CONSTRAINT "BrifQuestion_templateId_templateText_fkey" FOREIGN KEY ("templateId", "templateText") REFERENCES "QuestionTemplate"("id", "text") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrifQuestion" ADD CONSTRAINT "BrifQuestion_brifId_fkey" FOREIGN KEY ("brifId") REFERENCES "Brif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
