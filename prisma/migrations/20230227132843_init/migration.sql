-- CreateTable
CREATE TABLE "UserGame" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGameBiodata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "UserGameBiodata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGameHistory" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "UserGameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGame_username_key" ON "UserGame"("username");
