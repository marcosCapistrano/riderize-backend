/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `rideId` on the `UsersOnRides` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UsersOnRides` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,ride_id]` on the table `UsersOnRides` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ride_id` to the `UsersOnRides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UsersOnRides` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnRides" DROP CONSTRAINT "UsersOnRides_rideId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnRides" DROP CONSTRAINT "UsersOnRides_userId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "UsersOnRides_userId_rideId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UsersOnRides" DROP COLUMN "rideId",
DROP COLUMN "userId",
ADD COLUMN     "ride_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnRides_user_id_ride_id_key" ON "UsersOnRides"("user_id", "ride_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRides" ADD CONSTRAINT "UsersOnRides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRides" ADD CONSTRAINT "UsersOnRides_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
