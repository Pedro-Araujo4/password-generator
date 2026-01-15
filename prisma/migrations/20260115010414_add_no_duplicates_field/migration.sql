-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "hasSymbols" BOOLEAN NOT NULL,
    "noDuplicates" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Password" ("content", "createdAt", "hasSymbols", "id", "length") SELECT "content", "createdAt", "hasSymbols", "id", "length" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
