/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `JwtToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JwtToken_userId_key" ON "JwtToken"("userId");
