-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" INTEGER,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "snippetCategoryId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SnipeptCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "objectId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);
