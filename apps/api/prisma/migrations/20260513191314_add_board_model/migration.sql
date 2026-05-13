-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "idATemplate" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
