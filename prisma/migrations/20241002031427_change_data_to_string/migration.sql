-- CreateTable
CREATE TABLE "TableDefinition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ColumnDefinition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tableId" INTEGER NOT NULL,
    CONSTRAINT "ColumnDefinition_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "TableDefinition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TableData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "tableId" INTEGER NOT NULL,
    CONSTRAINT "TableData_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "TableDefinition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
