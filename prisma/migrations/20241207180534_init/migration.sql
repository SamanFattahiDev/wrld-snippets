/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" INTEGER,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviteLink" TEXT,
    "referralCounts" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("createdAt", "email", "id", "isDeleted", "organization", "password", "username") SELECT "createdAt", "email", "id", "isDeleted", "organization", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");
