/*
  Warnings:

  - You are about to drop the column `snippetCategoryId` on the `Snippet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Snippet" ("content", "createdAt", "id", "isDeleted", "title") SELECT "content", "createdAt", "id", "isDeleted", "title" FROM "Snippet";
DROP TABLE "Snippet";
ALTER TABLE "new_Snippet" RENAME TO "Snippet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
