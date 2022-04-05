/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EventToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_attendees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_attendees_AB_unique" ON "_attendees"("A", "B");

-- CreateIndex
CREATE INDEX "_attendees_B_index" ON "_attendees"("B");
