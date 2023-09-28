/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_date_registration" TIMESTAMP(3) NOT NULL,
    "end_date_registration" TIMESTAMP(3) NOT NULL,
    "additional_information" TEXT,
    "start_place" TEXT NOT NULL,
    "participants_limit" INTEGER,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnRides" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rideId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnRides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnRides_userId_rideId_key" ON "UsersOnRides"("userId", "rideId");

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRides" ADD CONSTRAINT "UsersOnRides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRides" ADD CONSTRAINT "UsersOnRides_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
