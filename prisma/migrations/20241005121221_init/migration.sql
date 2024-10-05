-- CreateTable
CREATE TABLE "TableDefinition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TableDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColumnDefinition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "ColumnDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableData" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "TableData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColumnDefinition" ADD CONSTRAINT "ColumnDefinition_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "TableDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableData" ADD CONSTRAINT "TableData_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "TableDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
