/*
  Warnings:

  - A unique constraint covering the columns `[inviteLink]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_inviteLink_key" ON "User"("inviteLink");
