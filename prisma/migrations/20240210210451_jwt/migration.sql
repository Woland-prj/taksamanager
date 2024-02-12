/*
  Warnings:

  - A unique constraint covering the columns `[profileId,username,email,password,role,depId,depName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "role" SET DEFAULT 'NOTDEFINED';

-- CreateTable
CREATE TABLE "JwtToken" (
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "JwtToken_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "JwtToken_token_key" ON "JwtToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_username_email_password_role_depId_depName_key" ON "User"("profileId", "username", "email", "password", "role", "depId", "depName");
