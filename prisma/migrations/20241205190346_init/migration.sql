-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Organization" ("createdAt", "id", "isDeleted", "name", "picture") SELECT "createdAt", "id", "isDeleted", "name", "picture" FROM "Organization";
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
