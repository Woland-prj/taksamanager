/*
  Warnings:

  - The primary key for the `JwtToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "JwtToken" DROP CONSTRAINT "JwtToken_pkey";
